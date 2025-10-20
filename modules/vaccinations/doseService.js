const doseRepository = require("./doseRepository");

const add_dose = async (vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes,dS_Status) => {
    const result = await doseRepository.add_dose(vR_ID, vet_ID, dS_Number, dS_ScheduledDate, dS_ActualDate, dS_Notes,dS_Status);
    if (!result.insertId) throw new Error("Insert failed");

    return await doseRepository.get_doseID(result.insertId);
};

const edit_dose = async (dS_ID, vet_ID,dS_ScheduledDate, dS_ActualDate, dS_Status, dS_Notes) => {
    const ds = await doseRepository.get_doseID(dS_ID);
    if (!ds) return false;

    const result = await doseRepository.edit_dose(dS_ID,vet_ID, dS_ScheduledDate, dS_ActualDate, dS_Status, dS_Notes);
    return result.affectedRows > 0;
};

const disable_dose = async (dS_ID) => {
    const ds = await doseRepository.get_doseID(dS_ID);
    if (!ds) return false;

    const result = await doseRepository.disable_dose(dS_ID);
    return result.affectedRows > 0;
};

const get_doseID = async (dS_ID) => {
    return await doseRepository.get_doseID(dS_ID);
};

const get_dosesByVaccination = async (vR_ID) => {
    return await doseRepository.get_dosesByVaccination(vR_ID);
};

module.exports = {
    add_dose,
    edit_dose,
    disable_dose,
    get_doseID,
    get_dosesByVaccination
};