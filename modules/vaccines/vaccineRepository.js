const db = require("../../config/db");
const Vaccine = require("../../models/vaccineListModel");

const add_vaccine = async (name, description) => {
    const query = `
        INSERT INTO vaccine_list (vaccine_Name, vaccine_Description, vaccine_Status)
        VALUES (?, ?, '1')`;
    const [result] = await db.promise().query(query, [name, description]);
    return result;
};

const get_vaccine = async () => {
    const query = `
        SELECT *
        FROM vaccine_list
        WHERE vaccine_Status = '1'
    `;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new Vaccine(row));
};

const get_vaccineID = async (id) => {
    const query = `
        SELECT *
        FROM vaccine_list
        WHERE vaccine_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length > 0) {
        return new Vaccine(rows[0]);
    }
    return null;
};

const edit_vaccine = async (id, name, description) => {
    const query = `
        UPDATE vaccine_list
        SET vaccine_Name = ?, vaccine_Description = ?
        WHERE vaccine_ID = ?`;
    const [result] = await db.promise().query(query, [name, description, id]);
    return result;
};

const disable_vaccine = async (id) => {
    const query = `UPDATE vaccine_list SET vaccine_Status = '2' WHERE vaccine_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    add_vaccine,
    get_vaccine,
    get_vaccineID,
    edit_vaccine,
    disable_vaccine
};