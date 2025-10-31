const db = require("../../config/db");

const add_breeding = async (mother_ID, dueDate) => {

    const insertQuery = `
        INSERT INTO Breeding (mother_ID, breed_DueDate, breed_Status)
        VALUES (?, ?, '1')`;
    const [result] = await db.promise().query(insertQuery, [mother_ID, dueDate]);

    const updateQuery = `
        UPDATE Dogs 
        SET dog_StatusBreeding = 3 
        WHERE dog_ID = ?`;

    await db.promise().query(updateQuery, [mother_ID]);

    return result;
};

const edit_breeding = async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.dueDate) {
        fields.push("breed_DueDate = ?");
        values.push(updates.dueDate);
    }
    if (updates.actualBirthDate) {
        fields.push("breed_ActualBirth = ?");
        values.push(updates.actualBirthDate);
    }
    if (updates.notes) {
        fields.push("breed_Notes = ?");
        values.push(updates.notes);
    }
    if (updates.puppyCount !== undefined) {
        fields.push("puppy_Count = ?");
        values.push(updates.puppyCount);
    }
    if (updates.status) {
        fields.push("breed_Status = ?");
        values.push(updates.status);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    const query = `UPDATE Breeding SET ${fields.join(", ")} WHERE breed_ID = ?`;
    values.push(id);

    const [result] = await db.promise().query(query, values);
    return result;
};

const get_breedings = async ({ status, year, month, page, limit }) => {
    let countQuery = `SELECT COUNT(*) as total FROM Breeding WHERE breed_Status != 4`;
    let dataQuery = `SELECT b.*, d.dog_Name as mother_Name FROM Breeding b LEFT JOIN Dogs d ON b.mother_ID = d.dog_ID WHERE breed_Status != 4`;
    const countParams = [];
    const dataParams = [];

    if (status) {
        countQuery += ` AND breed_Status = ?`;
        dataQuery += ` AND breed_Status = ?`;
        countParams.push(status);
        dataParams.push(status);
    }

    if (year && month) {
        countQuery += ` AND YEAR(breed_DueDate) = ? AND MONTH(breed_DueDate) = ?`;
        dataQuery += ` AND YEAR(breed_DueDate) = ? AND MONTH(breed_DueDate) = ?`;
        countParams.push(year, month);
        dataParams.push(year, month);
    } else if (year) {
        countQuery += ` AND YEAR(breed_DueDate) = ?`;
        dataQuery += ` AND YEAR(breed_DueDate) = ?`;
        countParams.push(year);
        dataParams.push(year);
    }

    dataQuery += ` ORDER BY b.breed_ID DESC`;

    if (page && limit) {
        const offset = (page - 1) * limit;
        dataQuery += ` LIMIT ? OFFSET ?`;
        dataParams.push(Number(limit), Number(offset));
    }

    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, dataParams);

    if (dataResult.length > 0) {
        const breedIds = dataResult.map(b => b.breed_ID);
        const attemptQuery = `SELECT ba.*, dd.dog_Name as father_Name FROM BreedingAttempt ba LEFT JOIN Dogs dd ON ba.father_ID = dd.dog_ID WHERE ba.breed_ID IN (${breedIds.map(() => '?').join(',')})`;
        const [attemptResult] = await db.promise().query(attemptQuery, breedIds);

        dataResult.forEach(b => {
            b.attempts = attemptResult.filter(a => a.breed_ID === b.breed_ID);
        });
    }

    return {
        breedings: dataResult,
        total: total
    };
};

const get_breedingID = async (id) => {
    const query = "SELECT b.*, d.dog_Name as mother_Name FROM Breeding b LEFT JOIN Dogs d ON b.mother_ID = d.dog_ID WHERE b.breed_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    const breeding = results[0] || null;

    if (breeding) {
        const attemptQuery = "SELECT ba.*, dd.dog_Name as father_Name FROM BreedingAttempt ba LEFT JOIN Dogs dd ON ba.father_ID = dd.dog_ID WHERE ba.breed_ID = ?";
        const [attempts] = await db.promise().query(attemptQuery, [id]);
        breeding.attempts = attempts;
    }

    return breeding;
};

const disable_breeding = async (id) => {
    const query = "UPDATE Breeding SET breed_Status = '4' WHERE breed_ID = ?";
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = { add_breeding, edit_breeding, get_breedings, get_breedingID, disable_breeding };