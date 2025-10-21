const dogHealthCheckService = require("./dogHealthCheckService");

const get_dogHealthChecks = async (req, res) => {
    try {
        const { status, result, dogName, page = 1, limit = 10 } = req.query;

        const filters = {
            status,
            result,
            dogName,
            page: parseInt(page),
            limit: parseInt(limit)
        };

        const { data, total } = await dogHealthCheckService.get_dogHealthChecks(filters);

        res.status(200).json({
            page: filters.page,
            limit: filters.limit,
            total,
            data: data.map(item => item.getProfile())
        });
    } catch (err) {
        console.error("Error fetching dog health checks:", err);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการตรวจสุขภาพได้" });
    }
};

const add_dogHealthCheck = async (req, res) => {
    try {
        const { dogId, hclId, vetId, scheduledDate, actualDate, notes, status, result } = req.body;

        if (!dogId || !hclId || !vetId || !scheduledDate) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลที่จำเป็น (dogId, hclId, vetId, scheduledDate)" });
        }

        const newRecord = await dogHealthCheckService.add_dogHealthCheck({
            dogId, hclId, vetId, scheduledDate, actualDate, notes, status, result
        });

        res.status(201).json(newRecord.getProfile());
    } catch (err) {
        console.error("Error adding dog health check:", err);
        res.status(500).json({ error: "ไม่สามารถเพิ่มรายการตรวจสุขภาพได้" });
    }
};

const update_dogHealthCheck = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { scheduledDate,actualDate, notes, status, result } = req.body;

        const updated = await dogHealthCheckService.update_dogHealthCheck(id, { scheduledDate,actualDate, notes, status, result });
        if (!updated) return res.status(404).json({ error: "ไม่พบรายการตรวจสุขภาพ" });

        res.status(200).json(updated.getProfile());
    } catch (err) {
        console.error("Error updating dog health check:", err);
        res.status(500).json({ error: "ไม่สามารถแก้ไขรายการตรวจสุขภาพได้" });
    }
};

const disable_dogHealthCheck = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = await dogHealthCheckService.disable_dogHealthCheck(id);

        if (!success) return res.status(404).json({ error: "ไม่พบรายการตรวจสุขภาพ" });
        res.status(200).json({ message: "ลบรายการตรวจสุขภาพเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({ error: "ไม่สามารถลบรายการตรวจสุขภาพได้" });
    }
};

module.exports = {
    get_dogHealthChecks,
    add_dogHealthCheck,
    update_dogHealthCheck,
    disable_dogHealthCheck
};
