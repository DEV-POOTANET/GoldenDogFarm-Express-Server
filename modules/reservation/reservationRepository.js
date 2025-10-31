const db = require("../../config/db");

const get_reservations = async ({ status, depositStatus, cusName, page, limit }) => {
    let countQuery = `
        SELECT COUNT(*) AS total 
        FROM Reservation r
        JOIN Customers c ON r.cus_ID = c.cus_ID
        WHERE 1=1
    `;
    let dataQuery = `
        SELECT r.*, b.breed_DueDate, d.dog_Name, c.cus_Name, u.user_Name
        FROM Reservation r
        LEFT JOIN Breeding b ON r.breed_ID = b.breed_ID
        LEFT JOIN Dogs d ON r.dog_ID = d.dog_ID
        JOIN Customers c ON r.cus_ID = c.cus_ID
        JOIN users u ON r.user_ID = u.user_ID
        WHERE 1=1
    `;

    const params = [];
    const countParams = [];

    if (status) {
        countQuery += ` AND r.reservation_Status = ?`;
        dataQuery += ` AND r.reservation_Status = ?`;
        countParams.push(status);
        params.push(status);
    }

    if (depositStatus) {
        countQuery += ` AND r.reservation_DepositStatus = ?`;
        dataQuery += ` AND r.reservation_DepositStatus = ?`;
        countParams.push(depositStatus);
        params.push(depositStatus);
    }

    if (cusName) {
        countQuery += ` AND c.cus_Name LIKE ?`;
        dataQuery += ` AND c.cus_Name LIKE ?`;
        countParams.push(`%${cusName}%`);
        params.push(`%${cusName}%`);
    }

    const offset = (page - 1) * limit;
    dataQuery += ` ORDER BY r.reservation_ID DESC`;
    dataQuery += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [countResult] = await db.promise().query(countQuery, countParams);
    const total = countResult[0].total;

    const [dataResult] = await db.promise().query(dataQuery, params);
    return { total, data: dataResult };
};

const add_reservation = async (data) => {
    const query = `
        INSERT INTO Reservation 
        (breed_ID, dog_ID, cus_ID, user_ID, reservation_Date, reservation_Deposit, reservation_Status, reservation_CancelReason, reservation_DepositStatus, reservation_CancelDate, reservation_Notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        data.breedId || null,
        data.dogId || null,
        data.cusId,
        data.userId,
        data.date,
        data.deposit,
        data.status || '1',
        data.cancelReason || null,
        data.depositStatus || null,
        data.cancelDate || null,
        data.notes || null
    ];
    const [result] = await db.promise().query(query, params);

    if (data.dogId) {
        const updateDogQuery = `
            UPDATE Dogs 
            SET dog_StatusSale = '3'
            WHERE dog_ID = ?
        `;
        await db.promise().query(updateDogQuery, [data.dogId]);
    }

    return result.insertId;
};

const get_reservationById = async (id) => {
    const query = `
        SELECT r.*, b.breed_DueDate, d.dog_Name, c.cus_Name, u.user_Name
        FROM Reservation r
        LEFT JOIN Breeding b ON r.breed_ID = b.breed_ID
        LEFT JOIN Dogs d ON r.dog_ID = d.dog_ID
        JOIN Customers c ON r.cus_ID = c.cus_ID
        JOIN users u ON r.user_ID = u.user_ID
        WHERE r.reservation_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows[0] || null;
};

const update_reservation = async (id, data) => {
    const query = `
        UPDATE Reservation
        SET reservation_Date = ?, reservation_Deposit = ?, reservation_Status = ?, reservation_CancelReason = ?, reservation_DepositStatus = ?, reservation_CancelDate = ?, reservation_Notes = ?
        WHERE reservation_ID = ?
    `;
    const params = [
        data.date,
        data.deposit,
        data.status,
        data.cancelReason ?? null,
        data.depositStatus ?? null,
        data.cancelDate ?? null,
        data.notes ?? null,
        id
    ];
    const [result] = await db.promise().query(query, params);
    return result;
};

const disable_reservation = async (id) => {
    const query = `UPDATE Reservation SET reservation_Status = '2' WHERE reservation_ID = ?`;
    const [result] = await db.promise().query(query, [id]);
    return result;
};

const get_reservationForPDF = async (id) => {
    const query = `
        SELECT r.*, 
               b.breed_DueDate, 
               d.dog_Name, d.dog_Price, 
               c.cus_Name, c.cus_Phone, c.cus_Email, 
               u.user_Name
        FROM Reservation r
        LEFT JOIN Breeding b ON r.breed_ID = b.breed_ID
        LEFT JOIN Dogs d ON r.dog_ID = d.dog_ID
        JOIN Customers c ON r.cus_ID = c.cus_ID
        JOIN users u ON r.user_ID = u.user_ID
        WHERE r.reservation_ID = ?
    `;
    const [rows] = await db.promise().query(query, [id]);
    return rows[0] || null;
};

module.exports = {
    get_reservations,
    add_reservation,
    get_reservationById,
    update_reservation,
    disable_reservation,get_reservationForPDF
};