const db = require("../../config/db");
const HealthCheckList = require("../../models/healthCheckListModel");

const add_hcl = async (name, description) => {
    const query = `
        INSERT INTO health_check_list (hCL_Name, hCL_Description, hCL_Status)
        VALUES (?, ?, '1')
    `;
    const [result] = await db.promise().query(query, [name, description]);
    return result;
};

const get_hcl = async () => {
    const query = `
        SELECT * FROM health_check_list
        WHERE hCL_Status = '1'
    `;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new HealthCheckList(row));
};

const get_hclID = async (id) => {
    const query = `
        SELECT * FROM health_check_list
        WHERE hCL_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows.length > 0 ? new HealthCheckList(rows[0]) : null;
};

const edit_hcl = async (id, name, description) => {
    const query = `
        UPDATE health_check_list
        SET hCL_Name = ?, hCL_Description = ?
        WHERE hCL_ID = ?
    `;
    const [result] = await db.promise().query(query, [name, description, id]);
    return result;
};

const disable_hcl = async (id) => {
    const query = `
        UPDATE health_check_list
        SET hCL_Status = '2'
        WHERE hCL_ID = ?
    `;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    add_hcl,
    get_hcl,
    get_hclID,
    edit_hcl,
    disable_hcl
};
