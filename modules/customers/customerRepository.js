const db = require("../../config/db");

const add_customer = async (name, phone, email, facebook, line) => {
    const query = `
        INSERT INTO Customers (cus_Name, cus_Phone, cus_Email, cus_Facebook, cus_Line, cus_Status)
        VALUES (?, ?, ?, ?, ?, '1')
    `;
    const [result] = await db.promise().query(query, [name, phone, email, facebook, line]);
    return result;
};

const edit_customer = async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.name) {
        fields.push("cus_Name = ?");
        values.push(updates.name);
    }
    if (updates.phone) {
        fields.push("cus_Phone = ?");
        values.push(updates.phone);
    }
    if (updates.email) {
        fields.push("cus_Email = ?");
        values.push(updates.email);
    }
    if (updates.facebook) {
        fields.push("cus_Facebook = ?");
        values.push(updates.facebook);
    }
    if (updates.line) {
        fields.push("cus_Line = ?");
        values.push(updates.line);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    const query = `UPDATE Customers SET ${fields.join(", ")} WHERE cus_ID = ?`;
    values.push(id);

    const [result] = await db.promise().query(query, values);
    return result;
};

const get_customers = async ({ name, phone, facebook, page, limit }) => {
    let countQuery = `SELECT COUNT(*) as total FROM Customers WHERE cus_Status = '1'`;
    let dataQuery  = `SELECT * FROM Customers WHERE cus_Status = '1'`;
    const countParams = [];
    const dataParams  = [];

    if (name) {
        countQuery += ` AND cus_Name LIKE ?`;
        dataQuery  += ` AND cus_Name LIKE ?`;
        countParams.push(`%${name}%`);
        dataParams.push(`%${name}%`);
    }

    if (phone) {
        countQuery += ` AND cus_Phone LIKE ?`;
        dataQuery  += ` AND cus_Phone LIKE ?`;
        countParams.push(`%${phone}%`);
        dataParams.push(`%${phone}%`);
    }

    if (facebook) {
        countQuery += ` AND cus_Facebook LIKE ?`;
        dataQuery  += ` AND cus_Facebook LIKE ?`;
        countParams.push(`%${facebook}%`);
        dataParams.push(`%${facebook}%`);
    }

    const offset = (page - 1) * limit;
    dataQuery += ` LIMIT ? OFFSET ?`;
    dataParams.push(Number(limit), Number(offset));

    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, dataParams);

    return {
        customers: dataResult,
        total: total
    };
};

const get_customerID = async (id) => {
    const query = "SELECT * FROM Customers WHERE cus_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    return results[0] || null;
};

const disable_customer = async (id) => {
    const query = "UPDATE Customers SET cus_Status = '2' WHERE cus_ID = ?";
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = { add_customer, edit_customer, get_customers, get_customerID, disable_customer };
