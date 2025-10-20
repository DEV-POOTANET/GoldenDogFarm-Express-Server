const db = require("../../config/db");
const colorsRepository = require("../colors/colorsRepository");

const get_dogByGenderForBreeding = async (Gender) => {
    const [rows] = await db.promise().query(`SELECT * FROM Dogs WHERE dog_Gender = ? and dog_StatusBreeding = 1`, [Gender]);
    if (rows.length === 0) throw new Error("ไม่พบสุนัขที่มีรหัสนี้");
    return rows[0];
};

const add_dog = async (dogData) => {
    // ตรวจสอบ dog_Microchip ว่าซ้ำหรือไม่
    if (dogData.dog_Microchip) {
        const [existing] = await db.promise().query(ป
            `SELECT dog_ID FROM Dogs WHERE dog_Microchip = ?`,
            [dogData.dog_Microchip]
        );
        if (existing.length > 0) {
            throw new Error("หมายเลขไมโครชิปนี้มีอยู่ในระบบแล้ว");
        }
    }

    // ตรวจสอบ color_ID
    const color = await colorsRepository.get_colorID(dogData.color_ID);
    if (!color || color.status !== "1") {
        throw new Error("color_ID ไม่มีอยู่ในตาราง Dogs_Color หรืออยู่ในสถานะ Inactive");
    }

    // ตรวจสอบ breeding_ID
    if (dogData.breeding_ID) {
        const [breeding] = await db.promise().query(
            `SELECT breed_ID FROM Breeding WHERE breed_ID = ?`,
            [dogData.breeding_ID]
        );
        if (breeding.length === 0) {
            throw new Error("breeding_ID ไม่มีอยู่ในตาราง Breeding");
        }
    }

    const query = `
        INSERT INTO Dogs (
            dog_Microchip, dog_RegNo, dog_Name, dog_CallName,
            dog_Birthday, dog_PedigreePDF, dog_Status, dog_StatusBreeding,
            dog_StatusSale, dog_StatusDel, dog_Owner, dog_Breeder,
            dog_Gender, dog_K9Url, dog_Price, color_ID, dog_Dad, dog_Mom, breeding_ID
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(query, [
        dogData.dog_Microchip || null,
        dogData.dog_RegNo || null,
        dogData.dog_Name,
        dogData.dog_CallName || null,
        dogData.dog_Birthday || null,
        dogData.dog_PedigreePDF || null,
        dogData.dog_Status,
        dogData.dog_StatusBreeding,
        dogData.dog_StatusSale,
        dogData.dog_StatusDel,
        dogData.dog_Owner || null,
        dogData.dog_Breeder || null,
        dogData.dog_Gender,
        dogData.dog_K9Url || null,
        dogData.dog_Price,
        dogData.color_ID,
        dogData.dog_Dad || null,
        dogData.dog_Mom || null,
        dogData.breeding_ID || null
    ]);

    return result;
};

const edit_dog = async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.dog_Microchip) {
        const [existing] = await db.promise().query(
            `SELECT dog_ID FROM Dogs WHERE dog_Microchip = ?`,
            [updates.dog_Microchip]
        );
        if (existing.length > 0) {
            throw new Error("หมายเลขไมโครชิปนี้มีอยู่ในระบบแล้ว");
        }
    }


    if (updates.dog_Microchip !== undefined) {
        fields.push("dog_Microchip = ?");
        values.push(updates.dog_Microchip);
    }
    if (updates.dog_RegNo !== undefined) {
        fields.push("dog_RegNo = ?");
        values.push(updates.dog_RegNo);
    }
    if (updates.dog_Name !== undefined) {
        fields.push("dog_Name = ?");
        values.push(updates.dog_Name);
    }
    if (updates.dog_CallName !== undefined) {
        fields.push("dog_CallName = ?");
        values.push(updates.dog_CallName);
    }
    if (updates.dog_Birthday !== undefined) {
        fields.push("dog_Birthday = ?");
        values.push(updates.dog_Birthday);
    }
    if (updates.dog_Status !== undefined) {
        fields.push("dog_Status = ?");
        values.push(updates.dog_Status);
    }
    if (updates.dog_StatusBreeding !== undefined) {
        fields.push("dog_StatusBreeding = ?");
        values.push(updates.dog_StatusBreeding);
    }
    if (updates.dog_StatusSale !== undefined) {
        fields.push("dog_StatusSale = ?");
        values.push(updates.dog_StatusSale);
    }
    if (updates.dog_StatusDel !== undefined) {
        fields.push("dog_StatusDel = ?");
        values.push(updates.dog_StatusDel);
    }
    if (updates.dog_Owner !== undefined) {
        fields.push("dog_Owner = ?");
        values.push(updates.dog_Owner);
    }
    if (updates.dog_Breeder !== undefined) {
        fields.push("dog_Breeder = ?");
        values.push(updates.dog_Breeder);
    }
    if (updates.dog_Gender !== undefined) {
        fields.push("dog_Gender = ?");
        values.push(updates.dog_Gender);
    }
    if (updates.dog_K9Url !== undefined) {
        fields.push("dog_K9Url = ?");
        values.push(updates.dog_K9Url);
    }
    if (updates.dog_Price !== undefined) {
        fields.push("dog_Price = ?");
        values.push(updates.dog_Price);
    }
    if (updates.color_ID !== undefined) {
        fields.push("color_ID = ?");
        values.push(updates.color_ID);
    }
    if (updates.dog_Dad !== undefined) {
        fields.push("dog_Dad = ?");
        values.push(updates.dog_Dad);
    }
    if (updates.dog_Mom !== undefined) {
        fields.push("dog_Mom = ?");
        values.push(updates.dog_Mom);
    }
    if (updates.breeding_ID !== undefined) {
        fields.push("breeding_ID = ?");
        values.push(updates.breeding_ID);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    const query = `UPDATE Dogs SET ${fields.join(", ")} WHERE dog_ID = ?`;
    values.push(id);

    const [result] = await db.promise().query(query, values);
    return result;
};


const add_dog_image = async (dogID, filename, type) => {
    const query = `INSERT INTO Dog_Images (dog_ID, img_URL, img_Type, img_Status) VALUES (?, ?, ?, '1')`;
    await db.promise().query(query, [dogID, filename, type]);
};


const get_dogID = async (dogID) => {
    const [rows] = await db.promise().query(`
        SELECT
            d.*,
            c.color_Name,
            dad.dog_Name AS dad_Name,
            mom.dog_Name AS mom_Name
        FROM Dogs d
                 LEFT JOIN dogs_color c ON d.color_ID = c.color_ID AND c.color_Status='1'
                 LEFT JOIN Dogs dad ON d.dog_Dad = dad.dog_ID
                 LEFT JOIN Dogs mom ON d.dog_Mom = mom.dog_ID
        WHERE d.dog_ID = ? AND d.dog_StatusDel = '1'
    `, [dogID]);

    if (rows.length === 0) throw new Error("ไม่พบสุนัขที่มีรหัสนี้");

    const dog = rows[0];

    // ดึงรูปทั้งหมดของสุนัขตัวนี้
    const [images] = await db.promise().query(
        `SELECT * FROM Dog_Images WHERE dog_ID = ? AND img_Status='1'`,
        [dogID]
    );

    const imagesMap = { profile: null, pedigree: null, show: [] };
    images.forEach(img => {
        if (img.img_Type === '1') imagesMap.profile = img.img_URL;
        else if (img.img_Type === '2') imagesMap.pedigree = img.img_URL;
        else if (img.img_Type === '3') imagesMap.show.push(img.img_URL);
    });

    return {
        ...dog,
        mainImage: imagesMap.profile,
        pedigreeImage: imagesMap.pedigree,
        showImages: imagesMap.show
    };
};

const get_dogs = async ({ dog_Name, dog_Status, dog_StatusBreeding, dog_StatusSale, dog_Gender, page, limit }) => {
    let countQuery = `SELECT COUNT(*) as total FROM Dogs d WHERE d.dog_StatusDel = '1'`;
    let dataQuery = `
        SELECT
            d.*,
            c.color_Name,
            dad.dog_Name AS dad_Name,
            mom.dog_Name AS mom_Name
        FROM Dogs d
                 LEFT JOIN dogs_color c ON d.color_ID = c.color_ID AND c.color_Status='1'
                 LEFT JOIN Dogs dad ON d.dog_Dad = dad.dog_ID
                 LEFT JOIN Dogs mom ON d.dog_Mom = mom.dog_ID
        WHERE d.dog_StatusDel = '1'
    `;

    const params = [];

    if (dog_Name) {
        countQuery += ` AND dog_Name LIKE ?`;
        dataQuery += ` AND d.dog_Name LIKE ?`;
        params.push(`%${dog_Name}%`);
    }
    if (dog_Status) {
        countQuery += ` AND dog_Status = ?`;
        dataQuery += ` AND d.dog_Status = ?`;
        params.push(dog_Status);
    }
    if (dog_StatusBreeding) {
        countQuery += ` AND dog_StatusBreeding = ?`;
        dataQuery += ` AND d.dog_StatusBreeding = ?`;
        params.push(dog_StatusBreeding);
    }
    if (dog_StatusSale) {
        countQuery += ` AND dog_StatusSale = ?`;
        dataQuery += ` AND d.dog_StatusSale = ?`;
        params.push(dog_StatusSale);
    }
    if (dog_Gender) {
        countQuery += ` AND dog_Gender = ?`;
        dataQuery += ` AND d.dog_Gender = ?`;
        params.push(dog_Gender);
    }

    dataQuery += ` ORDER BY d.dog_ID DESC`;

    if (page && limit) {
        const offset = (page - 1) * limit;
        dataQuery += ` LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));
    }



    const [countResult] = await db.promise().query(countQuery, params);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, params);

    const dogIDs = dataResult.map(d => d.dog_ID);
    let imagesMap = {};
    if (dogIDs.length > 0) {
        const [images] = await db.promise().query(
            `SELECT * FROM Dog_Images WHERE dog_ID IN (?) AND img_Status='1'`,
            [dogIDs]
        );
        images.forEach(img => {
            if (!imagesMap[img.dog_ID]) imagesMap[img.dog_ID] = { profile: null, pedigree: null, show: [] };
            if (img.img_Type === '1') imagesMap[img.dog_ID].profile = img.img_URL;
            else if (img.img_Type === '2') imagesMap[img.dog_ID].pedigree = img.img_URL;
            else if (img.img_Type === '3') imagesMap[img.dog_ID].show.push(img.img_URL);
        });
    }

    // เพิ่มข้อมูลรูปลงในแต่ละ dog
    const dogsWithImages = dataResult.map(d => ({
        ...d,
        mainImage: imagesMap[d.dog_ID]?.profile || null,
        pedigreeImage: imagesMap[d.dog_ID]?.pedigree || null,
        showImages: imagesMap[d.dog_ID]?.show || []
    }));

    return {
        dogs: dogsWithImages,
        total
    };
};


const disable_Dog = async (dogID) => {
    const [result] = await db.promise().query(
        `UPDATE Dogs SET dog_StatusDel = '2' WHERE dog_ID = ?`,
        [dogID]
    );
    return result.affectedRows > 0; // true ถ้า update สำเร็จ
};


module.exports = { add_dog, add_dog_image, get_dogID ,edit_dog,get_dogs,disable_Dog};