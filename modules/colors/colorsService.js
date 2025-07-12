const colorsRepository = require("./colorsRepository");


const add_color = async (name) => {
    const inserted = await colorsRepository.add_color(name);

    if (!inserted) {
        throw new Error("Insert failed");
    }

    const newColor = await colorsRepository.get_colorID(inserted.insertId);

    return newColor || null ;
};
const edit_color = async (id,name) => {
    const rawColor = await colorsRepository.get_colorID(id);
    if (!rawColor) return null;

    const result = await colorsRepository.edit_color(rawColor.id,name);
    return result.affectedRows > 0;
};

const get_color = async (req, res) => {
    const colors = await colorsRepository.get_color();
    return  colors || null ;
};

const get_colorID = async (id) => {
    const color = await colorsRepository.get_colorID(id);
    return color || null;
};

const disable_color = async (colorId) => {
    const rawColor = await colorsRepository.get_colorID(colorId);
    if (!rawColor) return null;

    rawColor.disable();

    const result = await colorsRepository.disable_color(rawColor.id);
    return result.affectedRows > 0;
};

module.exports = { add_color,edit_color, get_color ,get_colorID ,disable_color};