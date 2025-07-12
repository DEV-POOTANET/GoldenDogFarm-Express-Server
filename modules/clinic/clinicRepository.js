const db = require("../../config/db");
const Clinic = require("../../models/clinicModel");

const add_clinic = async (name, address, phone) => {
    const query = `
        INSERT INTO clinic (clinic_Name, clinic_Address, clinic_Phone, clinic_Status)
        VALUES (?, ?, ?, '1')`;
    const [result] = await db.promise().query(query, [name, address, phone]);
    return result;
};

const get_clinic = async () => {
    const query = `SELECT * FROM clinic WHERE clinic_Status = '1'`;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new Clinic(row));
};

const get_clinicID = async (id) => {
    const query = `SELECT * FROM clinic WHERE clinic_ID = ?`;
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length > 0) return new Clinic(rows[0]);
    return null;
};

const edit_clinic = async (id, name, address, phone) => {
    const query = `UPDATE clinic SET clinic_Name = ?, clinic_Address = ?, clinic_Phone = ? WHERE clinic_ID = ?`;
    const [result] = await db.promise().query(query, [name, address, phone, id]);
    return result;
};

const disable_clinic = async (id) => {
    const query = `UPDATE clinic SET clinic_Status = '2' WHERE clinic_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    add_clinic,
    get_clinic,
    get_clinicID,
    edit_clinic,
    disable_clinic
};
