const db = require("../../config/db");

const add_user = async (email, password, name, phone, role) => {
    const query = `
        INSERT INTO users (user_Email, user_Password, user_Name, user_Phone, user_Role, user_Status)
        VALUES (?, ?, ?, ?, ?, '1')
    `;
    const [result] = await db.promise().query(query, [email, password, name, phone, role]);
    return result;
};

const edit_user = async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.email) {
        fields.push("user_Email = ?");
        values.push(updates.email);
    }
    if (updates.password) {
        fields.push("user_Password = ?");
        values.push(updates.password);
    }
    if (updates.name) {
        fields.push("user_Name = ?");
        values.push(updates.name);
    }
    if (updates.phone) {
        fields.push("user_Phone = ?");
        values.push(updates.phone);
    }
    if (updates.role) {
        fields.push("user_Role = ?");
        values.push(updates.role);
    }

    if (fields.length === 0) return { affectedRows: 0 }; // ไม่มีอะไรให้ update

    const query = `UPDATE users SET ${fields.join(", ")} WHERE user_ID = ?`;
    values.push(id);

    const [result] = await db.promise().query(query, values);
    return result;
};


const get_users = async ({ name, role, page, limit }) => {
    let countQuery = `SELECT COUNT(*) as total FROM users WHERE user_Status = 1`;
    let dataQuery  = `SELECT * FROM users WHERE user_Status = 1`;
    const countParams = [];
    const dataParams  = [];

    if (name) {
        countQuery += ` AND user_Name LIKE ?`;
        dataQuery += ` AND user_Name LIKE ?`;
        countParams.push(`%${name}%`);
        dataParams.push(`%${name}%`);
    }

    if (role) {
        countQuery += ` AND user_Role = ?`;
        dataQuery += ` AND user_Role = ?`;
        countParams.push(role);
        dataParams.push(role);
    }

    const offset = (page - 1) * limit;
    dataQuery  += ` LIMIT ? OFFSET ?`;
    dataParams .push(Number(limit), Number(offset));

    // ดึงจำนวนทั้งหมด
    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, dataParams);
    return {
        users: dataResult,
        total: total
    };
};

const get_userID = async (id) => {
    const query = "SELECT * FROM users WHERE user_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    return results[0] || null;
};

const disable_user = async (userId) => {
    const query = `UPDATE users SET user_Status = '2' WHERE user_ID = ?`;
    const [result] = await db.promise().query(query, [userId]);
    return result;
};

module.exports = { add_user,get_users , get_userID , disable_user ,edit_user};
