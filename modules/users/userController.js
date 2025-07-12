const userRepository = require("./userRepository");
const userService = require("./userService");

const add_user = async (req, res) => {
    try {
        const { email, password, name, phone, role } = req.body;

        if (!email || !password || !name || !phone || !role) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newUser = await userService.add_user(email, password, name, phone, role);

        res.status(201).json(newUser.getProfile());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มผู้ใช้ได้" });
    }
};

const edit_user = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { email, password, name, phone, role } = req.body;

        if (isNaN(userId)) {
            return res.status(400).json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" });
        }

        const updatedUser = await userService.edit_user(userId, email, password, name, phone, role);

        if (!updatedUser) {
            return res.status(404).json({ error: "ไม่พบผู้ใช้ หรือไม่สามารถแก้ไขได้" });
        }

        res.status(200).json(updatedUser.getProfile());
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้" });
    }
};

const get_users = async (req, res) => {
    try {
        const { name, role, page = 1, limit = 50 } = req.query;

        const result  = await userService.get_users({
            name,
            role,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            total: result.total,
            data: result.users
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
    }
};

const get_userID = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" });
        }

        const user = await userService.get_userID(userId);

        if (!user) {
            return res.status(404).json({ error: "ไม่พบผู้ใช้ที่ระบุ" });
        }

        res.status(200).json(user);

    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
    }
};

const disable_user = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" });
        }

        const success = await userService.disable_user(userId);
        if (!success) {
            return res.status(404).json({ error: "ไม่พบผู้ใช้ หรือปิดใช้งานไม่สำเร็จ" });
        }

        res.status(200).json({ message: "ปิดการใช้งานผู้ใช้เรียบร้อยแล้ว" });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานผู้ใช้ได้" });
    }
};

module.exports = { add_user ,get_users ,get_userID , disable_user ,edit_user };
