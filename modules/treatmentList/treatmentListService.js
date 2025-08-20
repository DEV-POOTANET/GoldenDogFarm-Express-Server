const treatmentRepository = require("./treatmentListRepository");

const add_treatment = async (name, description) => {
    const result = await treatmentRepository.add_treatment(name, description);
    if (!result) throw new Error("Insert failed");

    return await treatmentRepository.get_treatmentID(result.insertId);
};

const get_treatment = async () => {
    return await treatmentRepository.get_treatment();
};

const get_treatmentID = async (id) => {
    return await treatmentRepository.get_treatmentID(id);
};

const edit_treatment = async (id, name, description) => {
    const treatment = await treatmentRepository.get_treatmentID(id);
    if (!treatment) return null;

    const result = await treatmentRepository.edit_treatment(id, name, description);
    return result.affectedRows > 0;
};

const disable_treatment = async (id) => {
    const treatment = await treatmentRepository.get_treatmentID(id);
    if (!treatment) return null;

    treatment.disable();
    const result = await treatmentRepository.disable_treatment(id);
    return result.affectedRows > 0;
};

module.exports = {
    add_treatment,
    get_treatment,
    get_treatmentID,
    edit_treatment,
    disable_treatment
};
