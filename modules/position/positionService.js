const positionRepository = require("./positionRepository");


const add_position = async (name) => {
    const inserted = await positionRepository.add_position(name);

    if (!inserted) {
        throw new Error("Insert failed");
    }

    const newPosition = await positionRepository.get_positionID(inserted.insertId);

    return newPosition || null ;
};
const edit_position = async (id,name) => {
    const rawPosition = await positionRepository.get_positionID(id);
    if (!rawPosition) return null;

    const result = await positionRepository.edit_position(rawPosition.id,name);
    return result.affectedRows > 0;
};

const get_position = async (req, res) => {
    const position = await positionRepository.get_position();
    return  position || null ;
};

const get_positionID = async (id) => {
    const position = await positionRepository.get_positionID(id);
    return position || null;
};

const disable_position = async (positionId) => {
    const rawPosition = await positionRepository.get_positionID(positionId);
    if (!rawPosition) return null;

    rawPosition.disable();

    const result = await positionRepository.disable_position(rawPosition.id);
    return result.affectedRows > 0;
};

module.exports = { add_position,edit_position, get_position ,get_positionID ,disable_position};