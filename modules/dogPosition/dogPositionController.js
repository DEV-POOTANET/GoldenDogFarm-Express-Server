const dogPositionService = require("./dogPositionService");

const add_dogPosition = async (req, res) => {
    try {
        const { dogId, positionId, year } = req.body;
        if (!dogId || !positionId || !year)
            return res.status(400).json({ error: "กรุณาระบุข้อมูลให้ครบ" });

        const dogPos = await dogPositionService.add_dogPosition(dogId, positionId, year);
        res.status(201).json(dogPos.getDogPosition());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มตำแหน่งสุนัขได้" });
    }
};

const get_dogPosition = async (req, res) => {
    try {
        const dogPositions = await dogPositionService.get_dogPosition();
        const response = dogPositions.map(dp => dp.getDogPosition());
        res.status(200).json({ data: response });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลตำแหน่งสุนัขได้" });
    }
};

const get_dogPositionID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const dogPos = await dogPositionService.get_dogPositionID(id);
        if (!dogPos) return res.status(404).json({ error: "ไม่พบตำแหน่งสุนัขที่ระบุ" });

        res.status(200).json(dogPos.getDogPosition());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
};

const edit_dogPosition = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { dogId, positionId, year } = req.body;
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await dogPositionService.edit_dogPosition(id, dogId, positionId, year);
        if (!success) return res.status(404).json({ error: "แก้ไขไม่สำเร็จ หรือไม่พบข้อมูล" });

        res.status(200).json({ message: "แก้ไขข้อมูลเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
};

const disable_dogPosition = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "รหัสไม่ถูกต้อง" });

        const success = await dogPositionService.disable_dogPosition(id);
        if (!success) return res.status(404).json({ error: "ไม่พบ หรือปิดการใช้งานไม่สำเร็จ" });

        res.status(200).json({ message: "ปิดการใช้งานเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดใช้งานได้" });
    }
};
const get_positionsByDog = async (req, res) => {
    try {
        const dogId = parseInt(req.params.dogId);
        if (isNaN(dogId)) return res.status(400).json({ error: "รหัสสุนัขไม่ถูกต้อง" });

        const dogPositions = await dogPositionService.get_positionsByDog(dogId);
        const response = dogPositions.map(dp => dp.getDogPosition());

        res.status(200).json({ data: response });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงตำแหน่งของสุนัขได้" });
    }
};
module.exports = {
    add_dogPosition,
    get_dogPosition,
    get_dogPositionID,
    edit_dogPosition,
    disable_dogPosition,
    get_positionsByDog
};
