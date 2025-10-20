const vaccinationRepository = require("./vaccinationRepository");
const { VaccinationRecord, } = require("../../models/vaccinationModel");
const get_vaccinationRecords = async ({ dog_Name, vR_Status, page, limit }) => {
     return  await vaccinationRepository.get_vaccinationRecords({ dog_Name, vR_Status, page, limit });

};
const add_vaccinationRecord = async (vaccine_ID, dog_ID, user_ID) => {
    const result = await vaccinationRepository.add_vaccinationRecord(vaccine_ID, dog_ID, user_ID);
    if (!result.insertId) throw new Error("Insert failed");

    return await vaccinationRepository.get_vaccinationRecordID(result.insertId);
};

const edit_vaccinationRecord = async (vR_ID, status) => {
    const vr = await vaccinationRepository.get_vaccinationRecordID(vR_ID);
    if (!vr) return false;

    vr.setStatus(status);
    const result = await vaccinationRepository.edit_vaccinationRecord(vR_ID, status);
    return result.affectedRows > 0;
};

const disable_vaccinationRecord = async (vR_ID) => {
    const vr = await vaccinationRepository.get_vaccinationRecordID(vR_ID);
    if (!vr) return false;

    vr.setStatus('ลบ');
    const result = await vaccinationRepository.disable_vaccinationRecord(vR_ID);
    return result.affectedRows > 0;
};

const get_vaccinationRecordID = async (vR_ID) => {
    return await vaccinationRepository.get_vaccinationRecordID(vR_ID);
};

const get_vaccinationRecordsByDog = async (dog_ID) => {
    return await vaccinationRepository.get_vaccinationRecordsByDog(dog_ID);
};

module.exports = {
    add_vaccinationRecord,
    edit_vaccinationRecord,
    disable_vaccinationRecord,
    get_vaccinationRecordID,
    get_vaccinationRecordsByDog,
    get_vaccinationRecords
};