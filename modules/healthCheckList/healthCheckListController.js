const healthCheckListService = require("./healthCheckListService");

const add_hcl = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: "กรุณาระบุชื่อการตรวจสุขภาพ" });

        const hcl = await healthCheckListService.add_hcl(name, description || null);
        res.status(201).json(hcl.getHealthCheckList());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลได้" });
    }
};

const get_hcl = async (req, res) => {
    try {
        const hcls = await healthCheckListService.get_hcl();
        const response = hcls.map(h => h.getHealthCheckList());
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
};

const get_hclID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const hcl = await healthCheckListService.get_hclID(id);
        if (!hcl) return res.status(404).json({ error: "ไม่พบข้อมูล" });

        res.status(200).json(hcl.getHealthCheckList());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
};

const edit_hcl = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await healthCheckListService.edit_hcl(id, name, description);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถแก้ไขได้" });
    }
};

const disable_hcl = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await healthCheckListService.disable_hcl(id);
        if (!success) return res.status(404).json({ error: "ปิดใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถปิดใช้งานได้" });
    }
};

module.exports = {
    add_hcl,
    get_hcl,
    get_hclID,
    edit_hcl,
    disable_hcl
};
