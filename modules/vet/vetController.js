const vetService = require("./vetService");

const add_vet = async (req, res) => {
    try {
        const { name, phone, clinicId } = req.body;
        if (!name) return res.status(400).json({ error: "กรุณาระบุชื่อสัตวแพทย์" });

        const vet = await vetService.add_vet(name, phone || null, clinicId || null);
        res.status(201).json(vet.getVet());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มสัตวแพทย์ได้" });
    }
};

const get_vet = async (req, res) => {
    try {
        const vets = await vetService.get_vet();
        res.status(200).json({ data: vets.map(vet => vet.getVet()) });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสัตวแพทย์ได้" });
    }
};

const get_vetID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const vet = await vetService.get_vetID(id);
        if (!vet) return res.status(404).json({ error: "ไม่พบสัตวแพทย์ที่ระบุ" });

        res.status(200).json(vet.getVet());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสัตวแพทย์ได้" });
    }
};

const edit_vet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, phone, clinicId } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await vetService.edit_vet(id, name, phone, clinicId);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ หรือไม่พบสัตวแพทย์" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
};

const disable_vet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await vetService.disable_vet(id);
        if (!success) return res.status(404).json({ error: "ไม่พบ หรือปิดการใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานสัตวแพทย์เรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดใช้งานได้" });
    }
};

module.exports = {
    add_vet,
    get_vet,
    get_vetID,
    edit_vet,
    disable_vet
};
