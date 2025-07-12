const colorsService = require('./colorsService');
const add_color = async (req, res) => {
    try {
        const {name} = req.body;

        if ( !name ) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newColor = await colorsService.add_color(name);

        res.status(201).json(newColor.getColor());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มสีได้" });
    }
};

const edit_color = async (req, res) => {
    try {
        const {name} = req.body;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "รหัสสีไม่ถูกต้อง" });
        }

        const success = await colorsService.edit_color(id , name);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบสีที่ระบุ หรือแก้ไขไม่สำเร็จ" });
        }

        res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานสีได้" });
    }
};

const get_color = async (req, res) => {
    try {
        const colors = await colorsService.get_color();
        res.status(200).json({ data: colors });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสีได้" });
    }
};

const get_colorID = async (req, res) => {
    try {
        const colorId = parseInt(req.params.id);
        if (isNaN(colorId)) {
            return res.status(400).json({ error: "รหัสสีไม่ถูกต้อง" });
        }

        const color = await colorsService.get_colorID(colorId);

        if (!color) {
            return res.status(404).json({ error: "ไม่พบสีที่ระบุ" });
        }

        res.status(200).json(color);

    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสีได้" });
    }
};
const disable_color = async (req, res) => {
    try {
        const colorId = parseInt(req.params.id);
        if (isNaN(colorId)) {
            return res.status(400).json({ error: "รหัสสีไม่ถูกต้อง" });
        }

        const success = await colorsService.disable_color(colorId);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบสีที่ระบุ หรือปิดใช้งานไม่สำเร็จ" });
        }

        res.status(200).json({ message: "ปิดการใช้งานสีเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานสีได้" });
    }
};
module.exports = { add_color, edit_color, get_color,get_colorID ,disable_color};