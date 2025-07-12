const authService = require("./authService");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.status(200).json({ token });
    } catch (err) {
        if (err.message === "Email or Password Invalid") {
            return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }

        if (err.message === "User Not Active") {
            return res.status(401).json({ error: "บัญชีผู้ใช้ถูกระงับ" });
        }
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
    }
};

module.exports = { login };
