const vaccineService = require("./vaccineService");

const add_vaccine = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: "กรุณาระบุชื่อวัคซีน" });

        const vaccine = await vaccineService.add_vaccine(name, description || null);
        res.status(201).json(vaccine.getVaccineList());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มวัคซีนได้" });
    }
};

const get_vaccine = async (req, res) => {
    try {
        const vaccines = await vaccineService.get_vaccine();
        const response = vaccines.map(vaccine => vaccine.getVaccineList());
        res.status(200).json({ data: response });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลวัคซีนได้" });
    }
};

const get_vaccineID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const vaccine = await vaccineService.get_vaccineID(id);
        if (!vaccine) return res.status(404).json({ error: "ไม่พบวัคซีนที่ระบุ" });

        res.status(200).json(vaccine.getVaccineList());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลวัคซีนได้" });
    }
};

const edit_vaccine = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await vaccineService.edit_vaccine(id, name, description);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ หรือไม่พบวัคซีน" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
};

const disable_vaccine = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await vaccineService.disable_vaccine(id);
        if (!success) return res.status(404).json({ error: "ไม่พบ หรือปิดการใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานวัคซีนเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดใช้งานได้" });
    }
};

module.exports = {
    add_vaccine,
    get_vaccine,
    get_vaccineID,
    edit_vaccine,
    disable_vaccine
};