const treatmentRecordService = require("./treatmentRecordService");

const get_treatmentRecords = async (req, res) => {
    try {
        const { status, dogName, page = 1, limit = 10 } = req.query;

        const filters = {
            status,
            dogName,
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const { data, total } = await treatmentRecordService.get_treatmentRecords(filters);

        res.status(200).json({
            page: filters.page,
            limit: filters.limit,
            total,
            data: data.map(item => item.getProfile())
        });
    } catch (err) {
        console.error("Error fetching treatment records:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการรักษาได้" });
    }
};

const add_treatmentRecord = async (req, res) => {
    try {
        const { tlId, dogId, vetId, userId, startDate, endDate, status } = req.body;

        if (!tlId || !dogId || !vetId || !userId || !startDate) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (tlId, dogId, vetId, userId, startDate)" });
        }

        const newRecord = await treatmentRecordService.add_treatmentRecord({
            tlId, dogId, vetId, userId, startDate, endDate, status
        });

        res.status(201).json(newRecord.getProfile());
    } catch (err) {
        console.error("Error adding treatment record:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มรายการการรักษาได้" });
    }
};

const update_treatmentRecord = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { startDate, endDate, status } = req.body;

        const updated = await treatmentRecordService.update_treatmentRecord(id, { startDate, endDate, status });
        if (!updated) return res.status(404).json({ error: "ไม่พบรายการการรักษา" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        console.error("Error updating treatment record:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขรายการการรักษาได้" });
    }
};

const disable_treatmentRecord = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = await treatmentRecordService.disable_treatmentRecord(id);

        if (!success) return res.status(404).json({ error: "ไม่พบรายการการรักษา" });
        res.status(200).json({ message: "ลบรายการการรักษาเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถลบรายการการรักษาได้" });
    }
};

module.exports = {
    get_treatmentRecords,
    add_treatmentRecord,
    update_treatmentRecord,
    disable_treatmentRecord
};