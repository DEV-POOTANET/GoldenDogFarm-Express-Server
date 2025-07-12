const vetRepository = require("./vetRepository");

const add_vet = async (name, phone, clinicId) => {
    const result = await vetRepository.add_vet(name, phone, clinicId);
    if (!result) throw new Error("Insert failed");

    return await vetRepository.get_vetID(result.insertId);
};

const get_vet = async () => {
    return await vetRepository.get_vet();
};

const get_vetID = async (id) => {
    return await vetRepository.get_vetID(id);
};

const edit_vet = async (id, name, phone, clinicId) => {
    const vet = await vetRepository.get_vetID(id);
    if (!vet) return null;

    const result = await vetRepository.edit_vet(id, name, phone, clinicId);
    return result.affectedRows > 0;
};

const disable_vet = async (id) => {
    const vet = await vetRepository.get_vetID(id);
    if (!vet) return null;

    vet.disable();
    const result = await vetRepository.disable_vet(id);
    return result.affectedRows > 0;
};

module.exports = {
    add_vet,
    get_vet,
    get_vetID,
    edit_vet,
    disable_vet
};
