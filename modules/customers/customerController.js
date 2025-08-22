const customerService = require("./customerService");

const add_customer = async (req, res) => {
    try {
        const { name, phone, email, facebook, line } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, เบอร์โทร)" });
        }

        const newCustomer = await customerService.add_customer(name, phone, email, facebook, line);
        res.status(201).json(newCustomer.getProfile());
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มลูกค้าได้" });
    }
};

const edit_customer = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const { name, phone, email, facebook, line } = req.body;

        const updated = await customerService.edit_customer(customerId, name, phone, email, facebook, line);
        if (!updated) return res.status(404).json({ error: "ไม่พบลูกค้า" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถแก้ไขลูกค้าได้" });
    }
};

const get_customers = async (req, res) => {
    try {
        const { name, phone, facebook, page = 1, limit = 50 } = req.query;
        const result = await customerService.get_customers({
            name, phone, facebook,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            total: result.total,
            data: result.customers.map(c => c.getProfile())
        });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลลูกค้าได้" });
    }
};

const get_customerID = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const customer = await customerService.get_customerID(customerId);
        if (!customer) return res.status(404).json({ error: "ไม่พบลูกค้า" });

        res.status(200).json(customer.getProfile());
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลลูกค้าได้" });
    }
};

const disable_customer = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id);
        const success = await customerService.disable_customer(customerId);
        if (!success) return res.status(404).json({ error: "ไม่พบลูกค้า" });

        res.status(200).json({ message: "ปิดการใช้งานลูกค้าเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถปิดการใช้งานลูกค้าได้" });
    }
};

module.exports = { add_customer, edit_customer, get_customers, get_customerID, disable_customer };
