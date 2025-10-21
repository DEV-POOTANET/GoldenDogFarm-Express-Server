const db = require("../../config/db");

const get_treatmentRecords = async ({ status, dogName, page, limit }) => {
    let countQuery = `
        SELECT COUNT(*) AS total 
        FROM TreatmentRecords tr
        JOIN Dogs d ON tr.dog_ID = d.dog_ID
        WHERE tr.tR_Status != '4'
    `;
    let dataQuery = `
        SELECT tr.*, d.dog_Name, tl.tL_Name, v.vet_Name, u.user_Name
        FROM TreatmentRecords tr
        JOIN Dogs d ON tr.dog_ID = d.dog_ID
        JOIN treatment_list tl ON tr.tL_ID = tl.tL_ID
        JOIN Vet v ON tr.vet_ID = v.vet_ID
        JOIN Users u ON tr.user_ID = u.user_ID
        WHERE tr.tR_Status != '4'
    `;

    const params = [];
    const countParams = [];

    if (status) {
        countQuery += ` AND tr.tR_Status = ?`;
        dataQuery += ` AND tr.tR_Status = ?`;
        countParams.push(status);
        params.push(status);
    }

    if (dogName) {
        countQuery += ` AND d.dog_Name LIKE ?`;
        dataQuery += ` AND d.dog_Name LIKE ?`;
        countParams.push(`%${dogName}%`);
        params.push(`%${dogName}%`);
    }

    const offset = (page - 1) * limit;
    dataQuery += ` ORDER BY tr.tR_ID DESC`;
    dataQuery += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, params);
    return { total, data: dataResult };
};

const add_treatmentRecord = async (data) => {
    const query = `
        INSERT INTO TreatmentRecords 
        (tL_ID, dog_ID, vet_ID, user_ID, tR_Status, tR_StartDate, tR_EndDate)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        data.tlId,
        data.dogId,
        data.vetId,
        data.userId,
        data.status || '1',
        data.startDate,
        data.endDate || null
    ];
    const [result] = await db.promise().query(query, params);
    return result.insertId;
};

const get_treatmentRecordById = async (id) => {
    const query = `
        SELECT tr.*, d.dog_Name, tl.tL_Name, v.vet_Name, u.user_Name
        FROM TreatmentRecords tr
        JOIN Dogs d ON tr.dog_ID = d.dog_ID
        JOIN treatment_list tl ON tr.tL_ID = tl.tL_ID
        JOIN Vet v ON tr.vet_ID = v.vet_ID
        JOIN Users u ON tr.user_ID = u.user_ID
        WHERE tr.tR_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows[0] || null;
};

const update_treatmentRecord = async (id, data) => {
    const query = `
        UPDATE TreatmentRecords
        SET tR_StartDate = ?, tR_EndDate = ?, tR_Status = ?
        WHERE tR_ID = ?
    `;
    const params = [
        data.startDate,
        data.endDate || null,
        data.status,
        id
    ];
    const [result] = await db.promise().query(query, params);
    return result;
};

const disable_treatmentRecord = async (id) => {
    const query = `UPDATE TreatmentRecords SET tR_Status = '4' WHERE tR_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    get_treatmentRecords,
    add_treatmentRecord,
    get_treatmentRecordById,
    update_treatmentRecord,
    disable_treatmentRecord
};