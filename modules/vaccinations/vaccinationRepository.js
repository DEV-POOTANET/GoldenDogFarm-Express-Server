const db = require("../../config/db");
const { VaccinationRecord,DoseSchedule } = require("../../models/vaccinationModel");
const doseRepository = require("./doseRepository"); // To load doses



const get_vaccinationRecords = async ({ dog_Name, vR_Status, page, limit }) => {
    let countQuery = `
        SELECT COUNT(*) as total
        FROM vaccination_records vr
                 LEFT JOIN vaccine_list vl ON vr.vaccine_ID = vl.vaccine_ID
                 LEFT JOIN dogs d ON vr.dog_ID = d.dog_ID
                 LEFT JOIN users u ON vr.user_ID = u.user_ID
        WHERE vr.vR_Status != '4'
    `;

    let dataQuery = `
        SELECT vr.*, vl.vaccine_Name, d.dog_Name, u.user_Name
        FROM vaccination_records vr
        LEFT JOIN vaccine_list vl ON vr.vaccine_ID = vl.vaccine_ID
        LEFT JOIN dogs d ON vr.dog_ID = d.dog_ID
        LEFT JOIN users u ON vr.user_ID = u.user_ID
        WHERE vr.vR_Status != '4'
    `;

    const params = [];

    if (dog_Name) {
        countQuery += ` AND d.dog_Name LIKE ?`;
        dataQuery += ` AND d.dog_Name LIKE ?`;
        params.push(`%${dog_Name}%`);
    }
    if (vR_Status) {
        countQuery += ` AND vr.vR_Status = ?`;
        dataQuery += ` AND vr.vR_Status = ?`;
        params.push(vR_Status);
    }

    dataQuery += ` ORDER BY vr.vR_ID DESC`;

    if (page && limit) {
        const offset = (page - 1) * limit;
        dataQuery += ` LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));
    }

    const [countResult] = await db.promise().query(countQuery, params);
    const total = countResult[0].total;

    const [rows] = await db.promise().query(dataQuery, params);
    const vrs = rows.map(row => {
        const vr = new VaccinationRecord(row);
        vr.vaccine_Name = row.vaccine_Name;
        vr.dog_Name = row.dog_Name;
        vr.user_Name = row.user_Name;
        return vr;
    });

    for (const vr of vrs) {
        vr.doses = await doseRepository.get_dosesByVaccination(vr.vR_ID);
    }

    return {
        vaccinations: vrs,
        total
    };
};


const add_vaccinationRecord = async (vaccine_ID, dog_ID, user_ID) => {
    const query = `
        INSERT INTO vaccination_records (vaccine_ID, dog_ID, user_ID, vR_Status)
        VALUES (?, ?, ?, '1')`;
    const [result] = await db.promise().query(query, [vaccine_ID, dog_ID, user_ID]);
    return result;
};

const edit_vaccinationRecord = async (vR_ID, status) => {
    const query = `UPDATE vaccination_records SET vR_Status = ? WHERE vR_ID = ?`;
    const [result] = await db.promise().query(query, [status, vR_ID]);
    return result;
};

const disable_vaccinationRecord = async (vR_ID) => {
    const query = `UPDATE vaccination_records SET vR_Status = '4' WHERE vR_ID = ?`;
    const [result] = await db.promise().query(query, [vR_ID]);
    return result;
};

const get_vaccinationRecordID = async (vR_ID) => {
    const query = `
        SELECT vr.*, vl.vaccine_Name, d.dog_Name, u.user_Name
        FROM vaccination_records vr
        LEFT JOIN vaccine_list vl ON vr.vaccine_ID = vl.vaccine_ID
        LEFT JOIN dogs d ON vr.dog_ID = d.dog_ID
        LEFT JOIN users u ON vr.user_ID = u.user_ID
        WHERE vr.vR_ID = ?
    `;
    const [rows] = await db.promise().query(query, [vR_ID]);
    if (rows.length === 0) return null;

    const vr = new VaccinationRecord(rows[0]);
    vr.vaccine_Name = rows[0].vaccine_Name;
    vr.dog_Name = rows[0].dog_Name;
    vr.user_Name = rows[0].user_Name;
    vr.doses = await doseRepository.get_dosesByVaccination(vR_ID);

    return vr;
};

const get_vaccinationRecordsByDog = async (dog_ID) => {
    const query = `
        SELECT vr.*, vl.vaccine_Name, d.dog_Name, u.user_Name
        FROM vaccination_records vr
        LEFT JOIN vaccine_list vl ON vr.vaccine_ID = vl.vaccine_ID
        LEFT JOIN dogs d ON vr.dog_ID = d.dog_ID
        LEFT JOIN users u ON vr.user_ID = u.user_ID
        WHERE vr.dog_ID = ? AND vr.vR_Status != '4'
    `;
    const [rows] = await db.promise().query(query, [dog_ID]);
    const vrs = rows.map(row => {
        const vr = new VaccinationRecord(row);
        vr.vaccine_Name = row.vaccine_Name;
        vr.dog_Name = row.dog_Name;
        vr.user_Name = row.user_Name;
        return vr;
    });

    for (const vr of vrs) {
        vr.doses = await doseRepository.get_dosesByVaccination(vr.vR_ID);
    }

    return vrs;
};

module.exports = {
    add_vaccinationRecord,
    edit_vaccinationRecord,
    disable_vaccinationRecord,
    get_vaccinationRecordID,
    get_vaccinationRecordsByDog,
    get_vaccinationRecords
};