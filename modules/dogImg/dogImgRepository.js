const db = require("../../config/db");

const add_dog_image = async (dogID, filename, type) => {
    if (type === "1" || type === "2") {
        await db.promise().query(
            `UPDATE Dog_Images SET img_Status = '2' WHERE dog_ID = ? AND img_Type = ?`,
            [dogID, type]
        );
    }

    if (type === "3") {
        const [rows] = await db.promise().query(
            `SELECT COUNT(*) as cnt FROM Dog_Images WHERE dog_ID = ? AND img_Type = '3' AND img_Status = '1'`,
            [dogID]
        );
        if (rows[0].cnt >= 4) {
            throw new Error("Show images ไม่สามารถเกิน 4 รูปได้");
        }
    }

    const query = `
    INSERT INTO Dog_Images (dog_ID, img_URL, img_Type, img_Status)
    VALUES (?, ?, ?, '1')
  `;
    await db.promise().query(query, [dogID, filename, type]);
};

const update_or_add_dog_image = async (dogID, filename, type) => {
    await delete_dog_image(dogID, type);
    await add_dog_image(dogID, filename, type);
};

const delete_dog_image = async (dogID, type) => {
    const query = `UPDATE Dog_Images SET img_Status = '2' WHERE dog_ID = ? AND img_Type = ?`;
    await db.promise().query(query, [dogID, type]);
};

const delete_dog_image_by_id = async (imgID) => {
    const query = `UPDATE Dog_Images SET img_Status = '2' WHERE img_ID = ?`;
    await db.promise().query(query, [imgID]);
};

const delete_dog_images_by_type = async (dogID, type) => {
    const query = `UPDATE Dog_Images SET img_Status = '2' WHERE dog_ID = ? AND img_Type = ?`;
    await db.promise().query(query, [dogID, type]);
};

const get_image_by_id = async (imgID) => {
    const [rows] = await db.promise().query(`SELECT * FROM Dog_Images WHERE img_ID = ? AND img_Status = '1'`, [imgID]);
    return rows[0];
};

module.exports = {
    add_dog_image,
    update_or_add_dog_image,
    delete_dog_image,
    delete_dog_image_by_id,
    delete_dog_images_by_type,
    get_image_by_id
};