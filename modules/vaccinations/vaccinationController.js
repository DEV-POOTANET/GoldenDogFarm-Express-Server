const vaccinationService = require("./vaccinationService");

const prepareVaccinationResponse = (vr) => {
    return {
        ...vr.getVaccinationRecord(),
        vaccine_Name: vr.vaccine_Name,
        dog_Name: vr.dog_Name,
        user_Name: vr.user_Name,
        doses: vr.doses ? vr.doses.map(ds => ({
            ...ds.getDoseSchedule(),
            vet_Name: ds.vet_Name
        })) : []
    };
};


const get_vaccinationRecords = async (req, res) => {
    try {
        const { dog_Name, vR_Status, page, limit } = req.query;

        const result = await vaccinationService.get_vaccinationRecords({
            dog_Name,
            vR_Status,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined
        });

        res.status(200).json({
            page: Number(page) || undefined,
            limit: Number(limit) || undefined,
            total: result.total,
            data: result.vaccinations.map(vr => prepareVaccinationResponse(vr))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบันทึกการฉีดวัคซีนได้" });
    }
};


const add_vaccinationRecord = async (req, res) => {
    try {
        const { vaccine_ID, dog_ID, user_ID } = req.body;
        if (!vaccine_ID || !dog_ID || !user_ID) return res.status(400).json({ error: "กรุณาระบุข้อมูลที่จำเป็น เช่น รหัสวัคซีน รหัสสุนัข รหัสผู้ใช้" });

        const vr = await vaccinationService.add_vaccinationRecord(vaccine_ID, dog_ID, user_ID);
        res.status(201).json(prepareVaccinationResponse(vr));
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลบันทึกการฉีดวัคซีนได้" });
    }
};

const edit_vaccinationRecord = async (req, res) => {
    try {
        const vR_ID = parseInt(req.params.vR_ID);
        const { status } = req.body;
        if (isNaN(vR_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });
        if (!['1', '2', '3'].includes(status)) return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });

        const success = await vaccinationService.edit_vaccinationRecord(vR_ID, status);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ หรือไม่พบข้อมูลบันทึกการฉีดวัคซีน" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
};

const disable_vaccinationRecord = async (req, res) => {
    try {
        const vR_ID = parseInt(req.params.vR_ID);
        if (isNaN(vR_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await vaccinationService.disable_vaccinationRecord(vR_ID);
        if (!success) return res.status(404).json({ error: "ไม่พบ หรือปิดการใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานบันทึกการฉีดวัคซีนเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานได้" });
    }
};

const get_vaccinationRecordID = async (req, res) => {
    try {
        const vR_ID = parseInt(req.params.vR_ID);
        if (isNaN(vR_ID)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const vr = await vaccinationService.get_vaccinationRecordID(vR_ID);
        if (!vr) return res.status(404).json({ error: "ไม่พบข้อมูลบันทึกการฉีดวัคซีนที่ระบุ" });

        res.status(200).json(prepareVaccinationResponse(vr));
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบันทึกการฉีดวัคซีนได้" });
    }
};

const get_vaccinationRecordsByDog = async (req, res) => {
    try {
        const dog_ID = parseInt(req.params.dog_ID);
        if (isNaN(dog_ID)) return res.status(400).json({ error: "รหัสสุนัขไม่ถูกต้อง" });

        const vrs = await vaccinationService.get_vaccinationRecordsByDog(dog_ID);
        const response = vrs.map(prepareVaccinationResponse);
        res.status(200).json({ data: response });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบันทึกการฉีดวัคซีนได้" });
    }
};

module.exports = {
    add_vaccinationRecord,
    edit_vaccinationRecord,
    disable_vaccinationRecord,
    get_vaccinationRecordID,
    get_vaccinationRecordsByDog,
    get_vaccinationRecords
};