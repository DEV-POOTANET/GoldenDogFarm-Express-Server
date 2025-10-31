const reservationRepository = require("./reservationRepository");
const Reservation = require("../../models/reservationModel");

const get_reservations = async (filters) => {
    const raw = await reservationRepository.get_reservations(filters);
    const data = raw.data.map(item => new Reservation(item));
    return { total: raw.total, data };
};

const add_reservation = async (data) => {
    const insertId = await reservationRepository.add_reservation(data);
    const newRecord = await reservationRepository.get_reservationById(insertId);
    return new Reservation(newRecord);
};

const update_reservation = async (id, updates) => {
    const existing = await reservationRepository.get_reservationById(id);
    if (!existing) return null;

    await reservationRepository.update_reservation(id, updates);
    const updated = await reservationRepository.get_reservationById(id);
    return new Reservation(updated);
};

const disable_reservation = async (id) => {
    const existing = await reservationRepository.get_reservationById(id);
    if (!existing) return null;

    const result = await reservationRepository.disable_reservation(id);
    return result.affectedRows > 0;
};

const get_reservationForPDF = async (id) => {
    const data = await reservationRepository.get_reservationForPDF(id);
    if (!data) return null;
    return data;
};
module.exports = {
    get_reservations,
    add_reservation,
    update_reservation,
    disable_reservation , get_reservationForPDF
};