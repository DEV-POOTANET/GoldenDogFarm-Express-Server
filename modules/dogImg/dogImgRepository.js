const db = require("../../config/db");

// เพิ่มรูป
const add_dog_image = async (dogID, filename, type) => {
    // Profile (1) มีได้แค่ 1
    if (type === "1") {
        await db.promise().query(
            `DELETE FROM Dog_Images WHERE dog_ID = ? AND img_Type = '1'`,
            [dogID]
        );
    }

    // Pedigree (2) มีได้แค่ 1 เช่นกัน
    if (type === "2") {
        await db.promise().query(
            `DELETE FROM Dog_Images WHERE dog_ID = ? AND img_Type = '2'`,
            [dogID]
        );
    }

    // Show (3) จำกัดสูงสุด 4
    if (type === "3") {
        const [rows] = await db.promise().query(
            `SELECT COUNT(*) as cnt FROM Dog_Images WHERE dog_ID = ? AND img_Type = '3'`,
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

// ลบรูป
const delete_dog_image = async (imgID) => {
    await db.promise().query(`DELETE FROM Dog_Images WHERE img_ID = ?`, [imgID]);
};

// ดึงรูปตามสุนัข
const get_images_by_dog = async (dogID) => {
    const [rows] = await db.promise().query(
        `SELECT * FROM Dog_Images WHERE dog_ID = ?`,
        [dogID]
    );
    return rows;
};

module.exports = {
    add_dog_image,
    delete_dog_image,
    get_images_by_dog
};
