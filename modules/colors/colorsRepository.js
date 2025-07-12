const db = require("../../config/db");
const Colors = require('../../models/colorsModel');

const add_color = async (name) => {
    const query = `
        INSERT INTO dogs_color (color_Name, color_Status)
        VALUES (?, '1')`;
    const [result] = await db.promise().query(query,  [name]);
    return result;
};

const edit_color = async (id,name) => {
    const query = `UPDATE dogs_color SET color_Name = ? WHERE color_ID = ?`;
    const [result] = await db.promise().query(query, [name,id]);
    return result;
};
const get_color = async () => {
    let Query  = `SELECT * FROM dogs_color WHERE color_Status = 1`;
    const [rows] = await db.promise().query(Query)
    return rows.map(row => new Colors(row));
};

const get_colorID = async (id) => {
    const query = "SELECT * FROM dogs_color WHERE color_ID = ?";
    const [results] = await db.promise().query(query, [id]);
    return new Colors(results[0]) || null ;
};

const disable_color = async (id) => {
    const query = `UPDATE dogs_color SET color_Status = '2' WHERE color_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};
module.exports = { add_color, edit_color ,get_color ,get_colorID ,disable_color };
