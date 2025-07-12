const clinicRepository = require("./clinicRepository");

const add_clinic = async (name, address, phone) => {
    const inserted = await clinicRepository.add_clinic(name, address, phone);
    if (!inserted) throw new Error("Insert failed");

    const newClinic = await clinicRepository.get_clinicID(inserted.insertId);
    return newClinic || null;
};

const get_clinic = async () => {
    return await clinicRepository.get_clinic();
};

const get_clinicID = async (id) => {
    return await clinicRepository.get_clinicID(id);
};

const edit_clinic = async (id, name, address, phone) => {
    const rawClinic = await clinicRepository.get_clinicID(id);
    if (!rawClinic) return null;

    const result = await clinicRepository.edit_clinic(id, name, address, phone);
    return result.affectedRows > 0;
};

const disable_clinic = async (id) => {
    const rawClinic = await clinicRepository.get_clinicID(id);
    if (!rawClinic) return null;

    rawClinic.disable();
    const result = await clinicRepository.disable_clinic(rawClinic.id);
    return result.affectedRows > 0;
};

module.exports = {
    add_clinic,
    get_clinic,
    get_clinicID,
    edit_clinic,
    disable_clinic
};
