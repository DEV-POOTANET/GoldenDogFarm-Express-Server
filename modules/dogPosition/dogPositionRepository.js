const db = require("../../config/db");
const DogPosition = require("../../models/dogPositionModel");

const add_dogPosition = async (dogId, positionId, year) => {
    const query = `
        INSERT INTO Dog_Position (dog_ID, position_ID, dp_Year, dp_Status)
        VALUES (?, ?, ?, '1')
    `;
    const [result] = await db.promise().query(query, [dogId, positionId, year]);
    return result;
};

const get_dogPosition = async () => {
    const query = `
        SELECT dp.*, d.dog_Name, p.position_Name
        FROM Dog_Position dp
                 INNER JOIN Dogs d ON dp.dog_ID = d.dog_ID
                 INNER JOIN position p ON dp.position_ID = p.position_ID
        WHERE dp.dp_Status = '1'
    `;
    const [rows] = await db.promise().query(query);
    return rows.map(row => new DogPosition(row));
};

const get_dogPositionID = async (id) => {
    const query = `
        SELECT dp.*, d.dog_Name, p.position_Name
        FROM Dog_Position dp
                 INNER JOIN Dogs d ON dp.dog_ID = d.dog_ID
                 INNER JOIN position p ON dp.position_ID = p.position_ID
        WHERE dp.dp_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    if (rows.length > 0) {
        return new DogPosition(rows[0]);
    }
    return null;
};

const edit_dogPosition = async (id, dogId, positionId, year) => {
    const query = `
        UPDATE Dog_Position
        SET dog_ID = ?, position_ID = ?, dp_Year = ?
        WHERE dp_ID = ?
    `;
    const [result] = await db.promise().query(query, [dogId, positionId, year, id]);
    return result;
};

const disable_dogPosition = async (id) => {
    const query = `UPDATE Dog_Position SET dp_Status = '2' WHERE dp_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};


const get_positionsByDog = async (dogId) => {
    const query = `
        SELECT dp.*, d.dog_Name, p.position_Name
        FROM Dog_Position dp
                 INNER JOIN Dogs d ON dp.dog_ID = d.dog_ID
                 INNER JOIN position p ON dp.position_ID = p.position_ID
        WHERE dp.dog_ID = ? AND dp.dp_Status = '1'
    `;
    const [rows] = await db.promise().query(query, [dogId]);
    return rows.map(row => new DogPosition(row));
};

module.exports = {
    add_dogPosition,
    get_dogPosition,
    get_dogPositionID,
    edit_dogPosition,
    disable_dogPosition,
    get_positionsByDog
};
