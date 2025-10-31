const db = require("../../config/db");

const add_breedingAttempt = async (breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed) => {
    const query = `
        INSERT INTO BreedingAttempt (breed_ID, father_ID, attempt_Date, attempt_Notes ,attempt_TypeBreed, attempt_Status)
        VALUES (?, ?, ?, ? ,?, '1')
    `;
    const [result] = await db.promise().query(query, [breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed]);
    return result;
};

const edit_breedingAttempt = async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.attempt_Date) {
        fields.push("attempt_Date = ?");
        values.push(updates.attempt_Date);
    }
    if (updates.attempt_Notes) {
        fields.push("attempt_Notes = ?");
        values.push(updates.attempt_Notes);
    }
    if (updates.attempt_TypeBreed) {
        fields.push("attempt_TypeBreed = ?");
        values.push(updates.attempt_TypeBreed);
    }
    if (updates.attempt_Status) {
        fields.push("attempt_Status = ?");
        values.push(updates.attempt_Status);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    const query = `UPDATE BreedingAttempt SET ${fields.join(", ")} WHERE attempt_ID = ?`;
    values.push(id);

    const [result] = await db.promise().query(query, values);
    return result;
};

const get_breedingAttempts = async () => {
    const countQuery = `SELECT COUNT(*) as total FROM BreedingAttempt`;
    const dataQuery = `SELECT ba.*, d.dog_Name as father_Name FROM BreedingAttempt ba LEFT JOIN Dogs d ON ba.father_ID = d.dog_ID`;

    const [countResult] = await db.promise().query(countQuery);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery);

    return {
        breedingAttempts: dataResult,
        total: total
    };
};

const get_breedingAttemptID = async (id) => {
    const query = "SELECT ba.*, d.dog_Name as father_Name FROM BreedingAttempt ba LEFT JOIN Dogs d ON ba.father_ID = d.dog_ID WHERE ba.attempt_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    return results[0] || null;
};

const disable_breedingAttempt = async (id) => {
    const query = "UPDATE BreedingAttempt SET attempt_Status = '4' WHERE attempt_ID = ?";
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = { add_breedingAttempt, edit_breedingAttempt, get_breedingAttempts, get_breedingAttemptID, disable_breedingAttempt };