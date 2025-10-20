const doseService = require("./doseService");

const prepareDoseResponse = (ds) => {
    return {
        ...ds.getDoseSchedule(),
        vet_Name: ds.vet_Name
    };
};

const add_dose = async (req, res) => {
    try {
        let { vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes,dS_Status } = req.body;

        if (!vR_ID || !dS_Number || !dS_ScheduledDate || !dS_Status) {
            return res.status(400).json({ error: "กรุณาระบุข้อมูลที่จำเป็น เช่น รหัสบันทึกการฉีดวัคซีน ลำดับโดส วันที่นัดฉีด" });
        }

        dS_ActualDate = dS_ActualDate && dS_ActualDate.trim() !== '' ? dS_ActualDate : null;
        dS_Notes = dS_Notes && dS_Notes.trim() !== '' ? dS_Notes : null;


        const ds = await doseService.add_dose(vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes,dS_Status);
        res.status(201).json(prepareDoseResponse(ds));
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลกำหนดการฉีดวัคซีนได้" });
    }
};


const edit_dose = async (req, res) => {
    try {
        const dS_ID = parseInt(req.params.dS_ID);
        const { vet_ID,dS_ScheduledDate, dS_ActualDate, dS_Status, dS_Notes } = req.body;
        if (isNaN(dS_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });
        if (dS_Status && !['1', '2', '3'].includes(dS_Status)) return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });

        const success = await doseService.edit_dose(dS_ID,vet_ID, dS_ScheduledDate, dS_ActualDate, dS_Status, dS_Notes);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ หรือไม่พบข้อมูลกำหนดการฉีดวัคซีน" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
};

const disable_dose = async (req, res) => {
    try {
        const dS_ID = parseInt(req.params.dS_ID);
        if (isNaN(dS_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await doseService.disable_dose(dS_ID);
        if (!success) return res.status(404).json({ error: "ไม่พบ หรือปิดการใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานกำหนดการฉีดวัคซีนเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานได้" });
    }
};

const get_doseID = async (req, res) => {
    try {
        const dS_ID = parseInt(req.params.dS_ID);
        if (isNaN(dS_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const ds = await doseService.get_doseID(dS_ID);
        if (!ds) return res.status(404).json({ error: "ไม่พบข้อมูลกำหนดการฉีดวัคซีนที่ระบุ" });

        res.status(200).json(prepareDoseResponse(ds));
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลกำหนดการฉีดวัคซีนได้" });
    }
};

const get_dosesByVaccination = async (req, res) => {
    try {
        const vR_ID = parseInt(req.params.vR_ID);
        if (isNaN(vR_ID)) return res.status(400).json({ error: "รหัสบันทึกการฉีดวัคซีนไม่ถูกต้อง" });

        const doses = await doseService.get_dosesByVaccination(vR_ID);
        const response = doses.map(prepareDoseResponse);
        res.status(200).json({ data: response });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลกำหนดการฉีดวัคซีนได้" });
    }
};

module.exports = {
    add_dose,
    edit_dose,
    disable_dose,
    get_doseID,
    get_dosesByVaccination
};