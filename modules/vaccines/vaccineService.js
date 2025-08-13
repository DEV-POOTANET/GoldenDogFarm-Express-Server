const vaccineRepository = require("./vaccineRepository");

const add_vaccine = async (name, description) => {
    const result = await vaccineRepository.add_vaccine(name, description);
    if (!result) throw new Error("Insert failed");

    return await vaccineRepository.get_vaccineID(result.insertId);
};

const get_vaccine = async () => {
    return await vaccineRepository.get_vaccine();
};

const get_vaccineID = async (id) => {
    return await vaccineRepository.get_vaccineID(id);
};

const edit_vaccine = async (id, name, description) => {
    const vaccine = await vaccineRepository.get_vaccineID(id);
    if (!vaccine) return null;

    const result = await vaccineRepository.edit_vaccine(id, name, description);
    return result.affectedRows > 0;
};

const disable_vaccine = async (id) => {
    const vaccine = await vaccineRepository.get_vaccineID(id);
    if (!vaccine) return null;

    vaccine.disable();
    const result = await vaccineRepository.disable_vaccine(id);
    return result.affectedRows > 0;
};

module.exports = {
    add_vaccine,
    get_vaccine,
    get_vaccineID,
    edit_vaccine,
    disable_vaccine
};