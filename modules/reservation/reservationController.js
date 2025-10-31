const reservationService = require("./reservationService");
const PDFDocument = require('pdfkit');
const path = require('path');
const moment = require("moment-timezone");
require('moment/locale/th');
const get_reservations = async (req, res) => {
    try {
        const { status, depositStatus, cusName, page = 1, limit = 10 } = req.query;

        const filters = {
            status,
            depositStatus,
            cusName,
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const { data, total } = await reservationService.get_reservations(filters);

        res.status(200).json({
            page: filters.page,
            limit: filters.limit,
            total,
            data: data.map(item => item.getProfile())
        });
    } catch (err) {
        console.error("Error fetching reservations:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการจองได้" });
    }
};

const add_reservation = async (req, res) => {
    try {
        const { breedId, dogId, cusId, userId, date, deposit, status, cancelReason, depositStatus, cancelDate, notes } = req.body;

        if (!cusId || !userId || !date || !deposit) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (cusId, userId, date, deposit)" });
        }

        const newRecord = await reservationService.add_reservation({
            breedId, dogId, cusId, userId, date, deposit, status, cancelReason, depositStatus, cancelDate, notes
        });

        res.status(201).json(newRecord.getProfile());
    } catch (err) {
        console.error("Error adding reservation:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มรายการจองได้" });
    }
};

const update_reservation = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { date, deposit, status, cancelReason, depositStatus, cancelDate, notes } = req.body;

        const updated = await reservationService.update_reservation(id, { date, deposit, status, cancelReason, depositStatus, cancelDate, notes });
        if (!updated) return res.status(404).json({ error: "ไม่พบรายการจอง" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        console.error("Error updating reservation:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขรายการจองได้" });
    }
};

const disable_reservation = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = await reservationService.disable_reservation(id);

        if (!success) return res.status(404).json({ error: "ไม่พบรายการจอง" });
        res.status(200).json({ message: "ลบรายการจองเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถลบรายการจองได้" });
    }
};



const generate_pdf = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reservation = await reservationService.get_reservationForPDF(id);
        if (!reservation) {
            return res.status(404).json({ error: "ไม่พบรายการจอง" });
        }

        // Format date to Thai style
        moment.locale('th');
        const thaiDate = moment(reservation.reservation_Date)
            .tz('Asia/Bangkok')
            .add(543, 'years')
            .format('D MMMM YYYY');

        const printDate = moment()
            .tz('Asia/Bangkok')
            .add(543, 'years')
            .format('D MMMM YYYY เวลา HH:mm น.');

        // Create PDF document
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reservation_${id}.pdf`);

        // Register Thai font
        const fontPath = path.join(__dirname, '../../fonts/THSarabunNew.ttf');
        doc.registerFont('NotoSansThai', fontPath);
        const logoPath = path.join(__dirname, '../../images/img.png');

        doc.pipe(res);

        // === HEADER SECTION ===
        // Background header with gradient effect (simulate with overlapping rects)
        doc.rect(0, 0, doc.page.width, 140).fill('#1e3a8a'); // Dark blue header

        // Add logo
        let logoWidth = 0;
        try {
            const img = doc.openImage(logoPath);
            logoWidth = img.width > 100 ? 100 : img.width; // จำกัดไม่เกิน 100px
            doc.image(logoPath, 50, 35, { width: logoWidth });
        } catch (err) {
            console.warn('Logo not found, skipping...');
            logoWidth = 0;
        }

        // Company name and title
        doc.font('NotoSansThai')
            .fontSize(26)
            .fillColor('#ffffff')
            .text('ใบยืนยันการจอง', logoWidth > 0 ? 140 : 50, 45, { continued: false });

        doc.fontSize(14)
            .fillColor('#e0e7ff')
            .text('Reservation Confirmation', logoWidth > 0 ? 140 : 50, 75);

        // Reservation ID in header
        doc.fontSize(16)
            .fillColor('#ffffff')
            .text(`#${String(reservation.reservation_ID).padStart(6, '0')}`, doc.page.width - 150, 55, {
                width: 100,
                align: 'right'
            });

        // === INFORMATION SECTION ===
        let currentY = 170;

        // Customer Information Box
        doc.rect(50, currentY, doc.page.width - 100, 30)
            .fill('#f1f5f9');

        doc.fontSize(14)
            .fillColor('#1e293b')
            .text('ข้อมูลลูกค้า', 60, currentY + 8);

        currentY += 45;

        // Customer details in a clean grid
        const leftColumn = 60;
        const rightColumn = doc.page.width / 2 + 30;
        const lineHeight = 22;

        doc.fontSize(12)
            .fillColor('#64748b')
            .text('ชื่อลูกค้า', leftColumn, currentY);
        doc.fillColor('#1e293b')
            .text(reservation.cus_Name, leftColumn + 120, currentY);

        doc.fillColor('#64748b')
            .text('เบอร์โทรศัพท์', rightColumn, currentY);
        doc.fillColor('#1e293b')
            .text(reservation.cus_Phone || '-', rightColumn + 120, currentY);

        currentY += lineHeight;

        doc.fillColor('#64748b')
            .text('วันที่จอง', leftColumn, currentY);
        doc.fillColor('#1e293b')
            .text(thaiDate, leftColumn + 120, currentY);

        doc.fillColor('#64748b')
            .text('สถานะ', rightColumn, currentY);

        // Status with color badge
        const statusInfo = getStatusInfo(reservation.reservation_Status);
        doc.rect(rightColumn + 120, currentY - 2, 80, 18)
            .fill(statusInfo.bgColor);
        doc.fillColor(statusInfo.textColor)
            .text(statusInfo.text, rightColumn + 120, currentY, { width: 80, align: 'center' });

        currentY += 40;

        // Dog Information Box
        doc.rect(50, currentY, doc.page.width - 100, 30)
            .fill('#f1f5f9');

        doc.fontSize(14)
            .fillColor('#1e293b')
            .text('ข้อมูลสุนัข', 60, currentY + 8);

        currentY += 45;

        doc.fontSize(12)
            .fillColor('#64748b')
            .text('ชื่อสุนัข', leftColumn, currentY);
        doc.fillColor('#1e293b')
            .text(reservation.dog_Name || '-', leftColumn + 120, currentY);

        doc.fillColor('#64748b')
            .text('ราคาสุนัข', rightColumn, currentY);
        doc.fillColor('#1e293b')
            .text(reservation.dog_Price ? reservation.dog_Price.toLocaleString('th-TH') + ' บาท' : '-',
                rightColumn + 120, currentY);

        currentY += 40;

        // === PAYMENT SECTION ===
        doc.rect(50, currentY, doc.page.width - 100, 30)
            .fill('#f1f5f9');

        doc.fontSize(14)
            .fillColor('#1e293b')
            .text('ข้อมูลการชำระเงิน', 60, currentY + 8);

        currentY += 45;

        // Payment summary box
        doc.roundedRect(50, currentY, doc.page.width - 100, 80, 5)
            .lineWidth(1)
            .strokeColor('#e2e8f0')
            .stroke();

        const summaryLeft = 70;
        currentY += 20;

        doc.fontSize(12)
            .fillColor('#64748b')
            .text('ราคาสุนัข', summaryLeft, currentY);
        doc.fillColor('#1e293b')
            .text((reservation.dog_Price || 0).toLocaleString('th-TH') + ' บาท',
                doc.page.width - 180, currentY, { width: 130, align: 'right' });

        currentY += 25;

        doc.fillColor('#64748b')
            .text('เงินมัดจำที่ชำระ', summaryLeft, currentY);
        doc.fillColor('#059669')
            .fontSize(14)
            .text(reservation.reservation_Deposit.toLocaleString('th-TH') + ' บาท',
                doc.page.width - 180, currentY, { width: 130, align: 'right' });

        currentY += 35;

        // Notes section if exists
        if (reservation.reservation_Notes) {
            currentY += 10;
            doc.rect(50, currentY, doc.page.width - 100, 30)
                .fill('#fef3c7');

            doc.fontSize(12)
                .fillColor('#92400e')
                .text('หมายเหตุ', 60, currentY + 8);

            currentY += 40;

            doc.fontSize(11)
                .fillColor('#78350f')
                .text(reservation.reservation_Notes, 60, currentY, {
                    width: doc.page.width - 120,
                    align: 'left'
                });
        }

        // === FOOTER ===
        const footerY = doc.page.height - 100;

        // Footer line
        doc.moveTo(50, footerY)
            .lineTo(doc.page.width - 50, footerY)
            .strokeColor('#e2e8f0')
            .lineWidth(1)
            .stroke();

        doc.fontSize(10)
            .fillColor('#94a3b8')
            .text(`พิมพ์เมื่อ: ${printDate}`, 50, footerY + 15);

        doc.text('ขอบคุณที่ใช้บริการ', 0, footerY + 15, {
            align: 'center',
            width: doc.page.width
        });

        doc.text('หน้า 1/1', doc.page.width - 100, footerY + 15, { align: 'right' });

        doc.end();
    } catch (err) {
        console.error("Error generating PDF:", err);
        res.status(500).json({ error: "ไม่สามารถสร้าง PDF ได้" });
    }
};

const getStatusInfo = (status) => {
    const statusMap = {
        '1': { text: 'จองแล้ว', bgColor: '#dcfce7', textColor: '#166534' },
        '2': { text: 'ถูกยกเลิก', bgColor: '#fee2e2', textColor: '#991b1b' },
        '3': { text: 'รอคืนมัดจำ', bgColor: '#fef3c7', textColor: '#92400e' },
        '4': { text: 'จำหน่ายแล้ว', bgColor: '#dbeafe', textColor: '#1e40af' }
    };
    return statusMap[status] || { text: status, bgColor: '#f3f4f6', textColor: '#374151' };
};
module.exports = {
    get_reservations,
    add_reservation,
    update_reservation,
    disable_reservation,generate_pdf
};