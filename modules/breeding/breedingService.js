const breedingRepository = require("./breedingRepository");
const Breeding = require("../../models/breedingModel");

const add_breeding = async (mother_ID, dueDate) => {
    const inserted = await breedingRepository.add_breeding(mother_ID, dueDate);
    if (!inserted) throw new Error("Insert failed");

    const newBreeding = await breedingRepository.get_breedingID(inserted.insertId);
    return new Breeding(newBreeding);
};

const edit_breeding = async (id, dueDate, actualBirthDate,notes, puppyCount, status) => {
    const existing = await breedingRepository.get_breedingID(id);
    if (!existing) return null;

    const updates = {};
    if (dueDate) updates.dueDate = dueDate;
    if (actualBirthDate) updates.actualBirthDate = actualBirthDate;
    if (notes) updates.notes = notes;
    if (puppyCount !== undefined) updates.puppyCount = puppyCount;
    if (status) updates.status = status;

    const result = await breedingRepository.edit_breeding(id, updates);
    if (result.affectedRows === 0) return null;

    const updated = await breedingRepository.get_breedingID(id);
    return new Breeding(updated);
};

const get_breedings = async ({ status, year, month, page, limit }) => {
    const raw = await breedingRepository.get_breedings({ status, year, month, page, limit });
    return {
        breedings: raw.breedings.map(b => new Breeding(b)),
        total: raw.total
    };
};

const get_breedingID = async (id) => {
    const breeding = await breedingRepository.get_breedingID(id);
    return breeding ? new Breeding(breeding) : null;
};

const disable_breeding = async (id) => {
    const raw = await breedingRepository.get_breedingID(id);
    if (!raw) return null;

    const breeding = new Breeding(raw);
    breeding.disable();

    const result = await breedingRepository.disable_breeding(id);
    return result.affectedRows > 0;
};

module.exports = { add_breeding, edit_breeding, get_breedings, get_breedingID, disable_breeding };