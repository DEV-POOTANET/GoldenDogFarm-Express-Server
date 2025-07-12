const positionService = require('./positionService');
const add_position = async (req, res) => {
    try {
        const {name} = req.body;

        if ( !name ) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newPosition = await positionService.add_position(name);

        res.status(201).json(newPosition.getPosition());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มตำแหน่งได้" });
    }
};

const edit_position = async (req, res) => {
    try {
        const {name} = req.body;
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "รหัสตำแหน่งไม่ถูกต้อง" });
        }

        const success = await positionService.edit_position(id , name);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบตำแหน่งที่ระบุ หรือแก้ไขไม่สำเร็จ" });
        }

        res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานตำแหน่งได้" });
    }
};

const get_position = async (req, res) => {
    try {
        const position = await positionService.get_position();
        res.status(200).json({ data: position });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลตำแหน่งได้" });
    }
};

const get_positionID = async (req, res) => {
    try {
        const positionId = parseInt(req.params.id);
        if (isNaN(positionId)) {
            return res.status(400).json({ error: "รหัสตำแหน่งไม่ถูกต้อง" });
        }

        const position = await positionService.get_positionID(positionId);

        if (!position) {
            return res.status(404).json({ error: "ไม่พบตำแหน่งที่ระบุ" });
        }

        res.status(200).json(position);

    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลตำแหน่งได้" });
    }
};
const disable_position = async (req, res) => {
    try {
        const positionId = parseInt(req.params.id);
        if (isNaN(positionId)) {
            return res.status(400).json({ error: "รหัสตำแหน่งไม่ถูกต้อง" });
        }

        const success = await positionService.disable_position(positionId);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบตำแหน่งที่ระบุ หรือปิดใช้งานไม่สำเร็จ" });
        }

        res.status(200).json({ message: "ปิดการใช้งานตำแหน่งเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานตำแหน่งได้" });
    }
};
module.exports = { add_position, edit_position, get_position,get_positionID ,disable_position};