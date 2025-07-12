const clinicService = require('./clinicService');

const add_clinic = async (req, res) => {
    try {
        const { name, address, phone } = req.body;

        if (!name) {
            return res.status(400).json({ error: "กรุณากรอกชื่อคลินิก" });
        }

        const newClinic = await clinicService.add_clinic(name, address || null, phone || null);
        res.status(201).json(newClinic.getClinic());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มคลินิกได้" });
    }
};

const get_clinic = async (req, res) => {
    try {
        const clinics = await clinicService.get_clinic();
        res.status(200).json({ data: clinics.map(clinic => clinic.getClinic()) });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลคลินิกได้" });
    }
};

const get_clinicID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสคลินิกไม่ถูกต้อง" });

        const clinic = await clinicService.get_clinicID(id);
        if (!clinic) return res.status(404).json({ error: "ไม่พบคลินิกที่ระบุ" });

        res.status(200).json(clinic.getClinic());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลคลินิกได้" });
    }
};

const edit_clinic = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, address, phone } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: "รหัสคลินิกไม่ถูกต้อง" });

        const success = await clinicService.edit_clinic(id, name, address, phone);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบคลินิกที่ระบุ หรือแก้ไขไม่สำเร็จ" });
        }

        res.status(200).json({ message: "แก้ไขข้อมูลคลินิกสำเร็จ" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลคลินิกได้" });
    }
};

const disable_clinic = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสคลินิกไม่ถูกต้อง" });

        const success = await clinicService.disable_clinic(id);
        if (!success) return res.status(404).json({ error: "ไม่พบคลินิกที่ระบุ หรือปิดใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานคลินิกเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานคลินิกได้" });
    }
};

module.exports = {
    add_clinic,
    get_clinic,
    get_clinicID,
    edit_clinic,
    disable_clinic
};
