const db = require("../../config/db");
const { DoseSchedule } = require("../../models/vaccinationModel");

const add_dose = async (vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes,dS_Status) => {
    const query = `
        INSERT INTO dose_schedules (vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes, dS_Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.promise().query(query, [
        vR_ID,
        vet_ID,
        dS_Number,
        dS_ScheduledDate,
        dS_ActualDate || null,
        dS_Notes || null,
        dS_Status
    ]);
    return result;
};

const edit_dose = async (dS_ID, vet_ID,dS_ScheduledDate, dS_ActualDate, dS_Status, dS_Notes) => {
    let query = `UPDATE dose_schedules SET `;
    const params = [];
    if (vet_ID) {
        query += `vet_ID = ?, `;
        params.push(vet_ID);
    }
    if (dS_ScheduledDate) {
        query += `dS_ScheduledDate = ?, `;
        params.push(dS_ScheduledDate);
    }
    if (dS_ActualDate !== undefined) { // Allow null
        query += `dS_ActualDate = ?, `;
        params.push(dS_ActualDate);
    }
    if (dS_Status) {
        query += `dS_Status = ?, `;
        params.push(dS_Status);
    }
    if (dS_Notes !== undefined) {
        query += `dS_Notes = ?, `;
        params.push(dS_Notes);
    }
    query = query.slice(0, -2);
    query += ` WHERE dS_ID = ?`;
    params.push(dS_ID);
    const [result] = await db.promise().query(query, params);
    return result;
};

const disable_dose = async (dS_ID) => {
    const query = `UPDATE dose_schedules SET dS_Status = '4' WHERE dS_ID = ?`;
    const [result] = await db.promise().query(query, [dS_ID]);
    return result;
};

const get_doseID = async (dS_ID) => {
    const query = `
        SELECT ds.*, v.vet_Name
        FROM dose_schedules ds
        LEFT JOIN vet v ON ds.vet_ID = v.vet_ID
        WHERE ds.dS_ID = ?
    `;
    const [rows] = await db.promise().query(query, [dS_ID]);
    if (rows.length === 0) return null;

    const ds = new DoseSchedule(rows[0]);
    ds.vet_Name = rows[0].vet_Name;
    return ds;
};

const get_dosesByVaccination = async (vR_ID) => {
    const query = `
        SELECT ds.*, v.vet_Name
        FROM dose_schedules ds
        LEFT JOIN vet v ON ds.vet_ID = v.vet_ID
        WHERE ds.vR_ID = ? AND ds.dS_Status != '4'
    `;
    const [rows] = await db.promise().query(query, [vR_ID]);
    return rows.map(row => {
        const ds = new DoseSchedule(row);
        ds.vet_Name = row.vet_Name;
        return ds;
    });
};

module.exports = {
    add_dose,
    edit_dose,
    disable_dose,
    get_doseID,
    get_dosesByVaccination
};