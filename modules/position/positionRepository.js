const db = require("../../config/db");
const Position = require('../../models/PositionModel');

const add_position = async (name) => {
    const query = `
        INSERT INTO \`position\` (position_Name, position_Status)
        VALUES (?, '1')`;
    const [result] = await db.promise().query(query,[name]);
    return result;
};

const edit_position = async (id,name) => {
    const query = `UPDATE position SET position_Name = ? WHERE position_ID = ?`;
    const [result] = await db.promise().query(query, [name,id]);
    return result;
};
const get_position = async () => {
    let Query  = `SELECT * FROM position WHERE position_Status = 1`;
    const [rows] = await db.promise().query(Query)
    return rows.map(row => new Position(row));
};

const get_positionID = async (id) => {
    const query = "SELECT * FROM position WHERE position_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    return new Position(results[0]) || null ;
};

const disable_position = async (id) => {
    const query = `UPDATE position SET position_Status = '2' WHERE position_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};
module.exports = { add_position, edit_position ,get_position ,get_positionID ,disable_position };
