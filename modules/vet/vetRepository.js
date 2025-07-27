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
    const query = `
        SELECT v.*, c.clinic_Name
        FROM vet v
        LEFT JOIN clinic c ON v.vet_Clinic_ID = c.clinic_ID
        WHERE v.vet_Status = '1'
    `;
    const [rows] = await db.promise().query(query);
    return rows.map(row => {
        const vet = new Vet(row);
        vet.clinic_Name = row.clinic_Name;
        return vet;
    });
};

const get_vetID = async (id) => {
    const query = `
        SELECT v.*, c.clinic_Name
        FROM vet v
        LEFT JOIN clinic c ON v.vet_Clinic_ID = c.clinic_ID
        WHERE v.vet_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length > 0) {
        const vet = new Vet(rows[0]);
        vet.clinic_Name = rows[0].clinic_Name;
        return vet;
    }
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
