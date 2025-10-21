const treatmentRecordRepository = require("./treatmentRecordRepository");
const TreatmentRecord = require("../../models/treatmentRecordModel");

const get_treatmentRecords = async (filters) => {
    const raw = await treatmentRecordRepository.get_treatmentRecords(filters);
    const data = raw.data.map(item => new TreatmentRecord(item));
    return { total: raw.total, data };
};

const add_treatmentRecord = async (data) => {
    const insertId = await treatmentRecordRepository.add_treatmentRecord(data);
    const newRecord = await treatmentRecordRepository.get_treatmentRecordById(insertId);
    return new TreatmentRecord(newRecord);
};

const update_treatmentRecord = async (id, updates) => {
    const existing = await treatmentRecordRepository.get_treatmentRecordById(id);
    if (!existing) return null;

    await treatmentRecordRepository.update_treatmentRecord(id, updates);
    const updated = await treatmentRecordRepository.get_treatmentRecordById(id);
    return new TreatmentRecord(updated);
};

const disable_treatmentRecord = async (id) => {
    const existing = await treatmentRecordRepository.get_treatmentRecordById(id);
    if (!existing) return null;

    const result = await treatmentRecordRepository.disable_treatmentRecord(id);
    return result.affectedRows > 0;
};

module.exports = {
    get_treatmentRecords,
    add_treatmentRecord,
    update_treatmentRecord,
    disable_treatmentRecord
};