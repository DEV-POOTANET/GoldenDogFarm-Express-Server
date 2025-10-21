const db = require("../../config/db");

const get_dogHealthChecks = async ({ status, result, dogName, page, limit }) => {
    let countQuery = `
        SELECT COUNT(*) AS total 
        FROM DogHealthCheck dhc
        JOIN Dogs d ON dhc.dog_ID = d.dog_ID
        WHERE dhc.dHC_Status != 4
    `;
    let dataQuery = `
        SELECT dhc.*, d.dog_Name, hcl.hCL_Name, v.vet_Name
        FROM DogHealthCheck dhc
        JOIN Dogs d ON dhc.dog_ID = d.dog_ID
        JOIN health_check_list hcl ON dhc.hCL_ID = hcl.hCL_ID
        JOIN vet v ON dhc.vet_ID = v.vet_ID
        WHERE dhc.dHC_Status != 4
    `;

    const params = [];
    const countParams = [];

    if (status) {
        countQuery += ` AND dhc.dHC_Status = ?`;
        dataQuery += ` AND dhc.dHC_Status = ?`;
        countParams.push(status);
        params.push(status);
    }

    if (result) {
        countQuery += ` AND dhc.dHC_Result = ?`;
        dataQuery += ` AND dhc.dHC_Result = ?`;
        countParams.push(result);
        params.push(result);
    }

    if (dogName) {
        countQuery += ` AND d.dog_Name LIKE ?`;
        dataQuery += ` AND d.dog_Name LIKE ?`;
        countParams.push(`%${dogName}%`);
        params.push(`%${dogName}%`);
    }

    const offset = (page - 1) * limit;
    dataQuery += ` ORDER BY dhc.dhc_ID DESC`;
    dataQuery += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, params);
    return { total, data: dataResult };
};

const add_dogHealthCheck = async (data) => {
    const query = `
        INSERT INTO DogHealthCheck 
        (dog_ID, hCL_ID, vet_ID, dHC_ScheduledDate, dHC_ActualDate, dHC_Notes, dHC_Status, dHC_Result)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        data.dogId,
        data.hclId,
        data.vetId,
        data.scheduledDate,
        data.actualDate || null,
        data.notes || null,
        data.status || '1',
        data.result || '1'
    ];
    const [result] = await db.promise().query(query, params);
    return result.insertId;
};

const get_dogHealthCheckById = async (id) => {
    const query = `
        SELECT dhc.*, d.dog_Name, hcl.hCL_Name, v.vet_Name
        FROM DogHealthCheck dhc
        JOIN Dogs d ON dhc.dog_ID = d.dog_ID
        JOIN health_check_list hcl ON dhc.hCL_ID = hcl.hCL_ID
        JOIN vet v ON dhc.vet_ID = v.vet_ID
        WHERE dhc.dHC_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows[0] || null;
};

const update_dogHealthCheck = async (id, data) => {
    const query = `
        UPDATE DogHealthCheck
        SET dHC_ScheduledDate = ? ,dHC_ActualDate = ?, dHC_Notes = ?, dHC_Status = ?, dHC_Result = ?
        WHERE dHC_ID = ?
    `;
    const params = [
        data.scheduledDate,
        data.actualDate || null,
        data.notes || null,
        data.status,
        data.result,
        id
    ];
    const [result] = await db.promise().query(query, params);
    return result;
};

const disable_dogHealthCheck = async (id) => {
    const query = `UPDATE DogHealthCheck SET dHC_Status = '4' WHERE dHC_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    get_dogHealthChecks,
    add_dogHealthCheck,
    get_dogHealthCheckById,
    update_dogHealthCheck,
    disable_dogHealthCheck
};
