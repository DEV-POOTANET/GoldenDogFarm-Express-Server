const db = require("../../config/db");
const Vet = require("../../models/vetModel");

const add_vet = async (name, phone, clinicId) => {
    const query = `
        INSERT INTO vet (vet_Name, vet_Phone, vet_Clinic_ID, vet_Status)
        VALUES (?, ?, ?, '1')`;
    const [result] = await db.promise().query(query, [name, phone, clinicId]);
    return result;
};

const get_vet = async () => {
    const query = `SELECT * FROM vet WHERE vet_Status = '1'`;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new Vet(row));
};

const get_vetID = async (id) => {
    const query = `SELECT * FROM vet WHERE vet_ID = ?`;
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length > 0) return new Vet(rows[0]);
    return null;
};

const edit_vet = async (id, name, phone, clinicId) => {
    const query = `
        UPDATE vet
        SET vet_Name = ?, vet_Phone = ?, vet_Clinic_ID = ?
        WHERE vet_ID = ?`;
    const [result] = await db.promise().query(query, [name, phone, clinicId, id]);
    return result;
};

const disable_vet = async (id) => {
    const query = `UPDATE vet SET vet_Status = '2' WHERE vet_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    add_vet,
    get_vet,
    get_vetID,
    edit_vet,
    disable_vet
};
