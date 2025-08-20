const db = require("../../config/db");
const TreatmentList = require("../../models/treatmentListModel");

const add_treatment = async (name, description) => {
    const query = `
        INSERT INTO treatment_list (tL_Name, tL_Description, tL_Status)
        VALUES (?, ?, '1')
    `;
    const [result] = await db.promise().query(query, [name, description]);
    return result;
};

const get_treatment = async () => {
    const query = `
        SELECT * FROM treatment_list
        WHERE tL_Status = '1'
    `;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new TreatmentList(row));
};

const get_treatmentID = async (id) => {
    const query = `
        SELECT * FROM treatment_list
        WHERE tL_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows.length > 0 ? new TreatmentList(rows[0]) : null;
};

const edit_treatment = async (id, name, description) => {
    const query = `
        UPDATE treatment_list
        SET tL_Name = ?, tL_Description = ?
        WHERE tL_ID = ?
    `;
    const [result] = await db.promise().query(query, [name, description, id]);
    return result;
};

const disable_treatment = async (id) => {
    const query = `
        UPDATE treatment_list
        SET tL_Status = '2'
        WHERE tL_ID = ?
    `;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    add_treatment,
    get_treatment,
    get_treatmentID,
    edit_treatment,
    disable_treatment
};
