const breedingAttemptRepository = require("./breedingAttemptRepository");
const BreedingAttempt = require("../../models/breedingAttemptModel");

const add_breedingAttempt = async (breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed) => {
    const inserted = await breedingAttemptRepository.add_breedingAttempt(breed_ID, father_ID, attempt_Date,attempt_Notes, attempt_TypeBreed);
    if (!inserted) throw new Error("Insert failed");

    const newBreedingAttempt = await breedingAttemptRepository.get_breedingAttemptID(inserted.insertId);
    return new BreedingAttempt(newBreedingAttempt);
};

const edit_breedingAttempt = async (id, attempt_Date, attempt_Notes, attempt_TypeBreed, attempt_Status) => {
    const existing = await breedingAttemptRepository.get_breedingAttemptID(id);
    if (!existing) return null;

    const updates = {};
    if (attempt_Date) updates.attempt_Date = attempt_Date;
    if (attempt_Notes) updates.attempt_Notes = attempt_Notes;
    if (attempt_TypeBreed) updates.attempt_TypeBreed = attempt_TypeBreed;
    if (attempt_Status) updates.attempt_Status = attempt_Status;

    const result = await breedingAttemptRepository.edit_breedingAttempt(id, updates);
    if (result.affectedRows === 0) return null;

    const updated = await breedingAttemptRepository.get_breedingAttemptID(id);
    return new BreedingAttempt(updated);
};

const get_breedingAttempts = async () => {
    const raw = await breedingAttemptRepository.get_breedingAttempts();
    return {
        breedingAttempts: raw.breedingAttempts.map(b => new BreedingAttempt(b)),
        total: raw.total
    };
};

const get_breedingAttemptID = async (id) => {
    const breedingAttempt = await breedingAttemptRepository.get_breedingAttemptID(id);
    return breedingAttempt ? new BreedingAttempt(breedingAttempt) : null;
};

const disable_breedingAttempt = async (id) => {
    const raw = await breedingAttemptRepository.get_breedingAttemptID(id);
    if (!raw) return null;

    const breedingAttempt = new BreedingAttempt(raw);
    breedingAttempt.disable();

    const result = await breedingAttemptRepository.disable_breedingAttempt(id);
    return result.affectedRows > 0;
};

module.exports = { add_breedingAttempt, edit_breedingAttempt, get_breedingAttempts, get_breedingAttemptID, disable_breedingAttempt };