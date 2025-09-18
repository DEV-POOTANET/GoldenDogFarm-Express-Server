const dogPositionRepository = require("./dogPositionRepository");

const add_dogPosition = async (dogId, positionId, year) => {
    const result = await dogPositionRepository.add_dogPosition(dogId, positionId, year);
    if (!result) throw new Error("Insert failed");

    return await dogPositionRepository.get_dogPositionID(result.insertId);
};

const get_dogPosition = async () => {
    return await dogPositionRepository.get_dogPosition();
};

const get_dogPositionID = async (id) => {
    return await dogPositionRepository.get_dogPositionID(id);
};

const edit_dogPosition = async (id, dogId, positionId, year) => {
    const dogPos = await dogPositionRepository.get_dogPositionID(id);
    if (!dogPos) return null;

    const result = await dogPositionRepository.edit_dogPosition(id, dogId, positionId, year);
    return result.affectedRows > 0;
};

const disable_dogPosition = async (id) => {
    const dogPos = await dogPositionRepository.get_dogPositionID(id);
    if (!dogPos) return null;

    dogPos.disable();
    const result = await dogPositionRepository.disable_dogPosition(id);
    return result.affectedRows > 0;
};

const get_positionsByDog = async (dogId) => {
    return await dogPositionRepository.get_positionsByDog(dogId);
};
module.exports = {
    add_dogPosition,
    get_dogPosition,
    get_dogPositionID,
    edit_dogPosition,
    disable_dogPosition,
    get_positionsByDog
};
