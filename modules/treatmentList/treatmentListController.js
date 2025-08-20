const treatmentService = require("./treatmentListService");

const add_treatment = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: "กรุณาระบุชื่อการรักษา" });

        const treatment = await treatmentService.add_treatment(name, description || null);
        res.status(201).json(treatment.getTreatmentList());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลได้" });
    }
};

const get_treatment = async (req, res) => {
    try {
        const treatments = await treatmentService.get_treatment();
        const response = treatments.map(t => t.getTreatmentList());
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
};

const get_treatmentID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const treatment = await treatmentService.get_treatmentID(id);
        if (!treatment) return res.status(404).json({ error: "ไม่พบข้อมูล" });

        res.status(200).json(treatment.getTreatmentList());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
};

const edit_treatment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await treatmentService.edit_treatment(id, name, description);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถแก้ไขได้" });
    }
};

const disable_treatment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await treatmentService.disable_treatment(id);
        if (!success) return res.status(404).json({ error: "ปิดใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถปิดใช้งานได้" });
    }
};

module.exports = {
    add_treatment,
    get_treatment,
    get_treatmentID,
    edit_treatment,
    disable_treatment
};
