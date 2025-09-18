const breedingService = require("./breedingService");

const add_breeding = async (req, res) => {
    try {
        const { mother_ID, dueDate } = req.body;
        if (!mother_ID || !dueDate) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (mother_ID, dueDate)" });
        }

        const newBreeding = await breedingService.add_breeding(mother_ID, dueDate);
        res.status(201).json(newBreeding.getProfile());
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลการผสมพันธุ์ได้" });
    }
};

const edit_breeding = async (req, res) => {
    try {
        const breedId = parseInt(req.params.id);
        const { dueDate, actualBirthDate,notes, puppyCount, status } = req.body;

        const updated = await breedingService.edit_breeding(breedId, dueDate, actualBirthDate,notes, puppyCount, status);
        if (!updated) return res.status(404).json({ error: "ไม่พบข้อมูลการผสมพันธุ์" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลการผสมพันธุ์ได้" });
    }
};

const get_breedings = async (req, res) => {
    try {
        const { status, year, month, page, limit } = req.query;
        const result = await breedingService.get_breedings({
            status,
            year: year ? parseInt(year) : undefined,
            month: month ? parseInt(month) : undefined,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined
        });

        res.status(200).json({
            page: Number(page) || undefined,
            limit: Number(limit) || undefined,
            total: result.total,
            data: result.breedings.map(b => b.getProfile())
        });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการผสมพันธุ์ได้" });
    }
};

const get_breedingID = async (req, res) => {
    try {
        const breedId = parseInt(req.params.id);
        const breeding = await breedingService.get_breedingID(breedId);
        if (!breeding) return res.status(404).json({ error: "ไม่พบข้อมูลการผสมพันธุ์" });

        res.status(200).json(breeding.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการผสมพันธุ์ได้" });
    }
};

const disable_breeding = async (req, res) => {
    try {
        const breedId = parseInt(req.params.id);
        const success = await breedingService.disable_breeding(breedId);
        if (!success) return res.status(404).json({ error: "ไม่พบข้อมูลการผสมพันธุ์" });

        res.status(200).json({ message: "ปิดการใช้งานการผสมพันธุ์เรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานการผสมพันธุ์ได้" });
    }
};

module.exports = { add_breeding, edit_breeding, get_breedings, get_breedingID, disable_breeding };