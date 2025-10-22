const dogService = require("./dogService");




const add_dog = async (req, res) => {
    try {
        const dogData = req.body;
        const files = req.files;

        // ตรวจสอบฟิลด์บังคับ
        const requiredFields = [
            "dog_Name",
            "dog_Gender",
            "color_ID",
            "dog_Status",
            "dog_StatusBreeding",
            "dog_StatusSale",
            "dog_StatusDel",
            "dog_Price"
        ];
        for (const field of requiredFields) {
            if (!dogData[field]) {
                return res.status(400).json({error: `กรุณากรอก ${field} ให้ครบถ้วน`});
            }
        }

        // ตรวจสอบว่า color_ID เป็นตัวเลข
        if (isNaN(dogData.color_ID)) {
            return res.status(400).json({error: "color_ID ต้องเป็นตัวเลข"});
        }

        // ตรวจสอบรูปแบบข้อมูล
        if (!["M", "F"].includes(dogData.dog_Gender)) {
            return res.status(400).json({error: "dog_Gender ต้องเป็น 'M' หรือ 'F'"});
        }
        if (!["1", "2", "3", "4", "5", "6"].includes(dogData.dog_Status)) {
            return res.status(400).json({error: "dog_Status ไม่ถูกต้อง"});
        }
        if (!["1", "2", "3", "4", "5"].includes(dogData.dog_StatusBreeding)) {
            return res.status(400).json({error: "dog_StatusBreeding ไม่ถูกต้อง"});
        }
        if (!["1", "2", "3", "4"].includes(dogData.dog_StatusSale)) {
            return res.status(400).json({error: "dog_StatusSale ไม่ถูกต้อง"});
        }
        if (!["1", "2"].includes(dogData.dog_StatusDel)) {
            return res.status(400).json({error: "dog_StatusDel ไม่ถูกต้อง"});
        }
        if (isNaN(dogData.dog_Price) || dogData.dog_Price < 0) {
            return res.status(400).json({error: "dog_Price ต้องเป็นตัวเลขที่ไม่ติดลบ"});
        }
        if (dogData.dog_Birthday && !/^\d{4}-\d{2}-\d{2}$/.test(dogData.dog_Birthday)) {
            return res.status(400).json({error: "dog_Birthday ต้องอยู่ในรูปแบบ YYYY-MM-DD"});
        }

        const newDog = await dogService.add_dog(dogData, files);
        res.status(201).json(newDog.getProfile());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err.message);
        res.status(500).json({error: `ไม่สามารถเพิ่มสุนัขได้: ${err.message}`});
    }
};
const edit_dog = async (req, res) => {
    try {
        const dogId = parseInt(req.params.id);
        const dogData = req.body;
        const files = req.files;

        const updated = await dogService.edit_dog(dogId, dogData, files);
        if (!updated) {
            return res.status(404).json({ error: "ไม่พบข้อมูลสุนัข" });
        }

        res.status(200).json(updated.getProfile());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลสุนัขได้" });
    }
};

const get_dogs = async (req, res) => {
    try {
        const { dog_Name, dog_Status, dog_StatusBreeding, dog_StatusSale, dog_Gender, page, limit } = req.query;

        const result = await dogService.get_dogs({
            dog_Name,
            dog_Status,
            dog_StatusBreeding,
            dog_StatusSale,
            dog_Gender,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined
        });

        res.status(200).json({
            page: Number(page) || undefined,
            limit: Number(limit) || undefined,
            total: result.total,
            data: result.dogs.map(d => d.getProfile())
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสุนัขได้" });
    }
};
const get_dogID = async (req, res) => {
    try {
        const { dogID } = req.params;
        const dog = await dogService.get_dogID(dogID);
        res.status(200).json(dog.getProfile());
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message });
    }
};

const disable_Dog = async (req, res) => {
    try {
        const dogID = parseInt(req.params.id);
        if (isNaN(dogID)) {
            return res.status(400).json({ error: "รหัสสุนัขไม่ถูกต้อง" });
        }

        const success = await dogService.disable_Dog(dogID);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบสุนัข หรือปิดการใช้งานไม่สำเร็จ" });
        }

        res.status(200).json({ message: "ปิดการใช้งานสุนัขเรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานสุนัขได้" });
    }
};

module.exports = {add_dog, edit_dog , get_dogs,get_dogID,disable_Dog};