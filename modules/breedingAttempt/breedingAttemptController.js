const breedingAttemptService = require("./breedingAttemptService");

const add_breedingAttempt = async (req, res) => {
    try {
        const { breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed } = req.body;
        if (!breed_ID || !father_ID || !attempt_Date || !attempt_TypeBreed) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (breed_ID, father_ID, attempt_Date, attempt_TypeBreed)" });
        }

        const newBreedingAttempt = await breedingAttemptService.add_breedingAttempt(breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed);
        res.status(201).json(newBreedingAttempt.getProfile());
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มข้อมูลการพยายามผสมพันธุ์ได้" });
    }
};

const edit_breedingAttempt = async (req, res) => {
    try {
        const attemptId = parseInt(req.params.id);
        const { attempt_Date, attempt_Notes, attempt_TypeBreed, attempt_Status } = req.body;

        const updated = await breedingAttemptService.edit_breedingAttempt(attemptId, attempt_Date, attempt_Notes, attempt_TypeBreed, attempt_Status);
        if (!updated) return res.status(404).json({ error: "ไม่พบข้อมูลการพยายามผสมพันธุ์" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลการพยายามผสมพันธุ์ได้" });
    }
};

const get_breedingAttempts = async (req, res) => {
    try {
        const result = await breedingAttemptService.get_breedingAttempts();

        res.status(200).json({
            total: result.total,
            data: result.breedingAttempts.map(b => b.getProfile())
        });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการพยายามผสมพันธุ์ได้" });
    }
};

const get_breedingAttemptID = async (req, res) => {
    try {
        const attemptId = parseInt(req.params.id);
        const breedingAttempt = await breedingAttemptService.get_breedingAttemptID(attemptId);
        if (!breedingAttempt) return res.status(404).json({ error: "ไม่พบข้อมูลการพยายามผสมพันธุ์" });

        res.status(200).json(breedingAttempt.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการพยายามผสมพันธุ์ได้" });
    }
};

const disable_breedingAttempt = async (req, res) => {
    try {
        const attemptId = parseInt(req.params.id);
        const success = await breedingAttemptService.disable_breedingAttempt(attemptId);
        if (!success) return res.status(404).json({ error: "ไม่พบข้อมูลการพยายามผสมพันธุ์" });

        res.status(200).json({ message: "ปิดการใช้งานการพยายามผสมพันธุ์เรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานการพยายามผสมพันธุ์ได้" });
    }
};

module.exports = { add_breedingAttempt, edit_breedingAttempt, get_breedingAttempts, get_breedingAttemptID, disable_breedingAttempt };