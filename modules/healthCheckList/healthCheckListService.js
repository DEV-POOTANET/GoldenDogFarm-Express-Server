const healthCheckListRepository = require("./healthCheckListRepository");

const add_hcl = async (name, description) => {
    const result = await healthCheckListRepository.add_hcl(name, description);
    if (!result) throw new Error("Insert failed");

    return await healthCheckListRepository.get_hclID(result.insertId);
};

const get_hcl = async () => {
    return await healthCheckListRepository.get_hcl();
};

const get_hclID = async (id) => {
    return await healthCheckListRepository.get_hclID(id);
};

const edit_hcl = async (id, name, description) => {
    const hcl = await healthCheckListRepository.get_hclID(id);
    if (!hcl) return null;

    const result = await healthCheckListRepository.edit_hcl(id, name, description);
    return result.affectedRows > 0;
};

const disable_hcl = async (id) => {
    const hcl = await healthCheckListRepository.get_hclID(id);
    if (!hcl) return null;

    hcl.disable();
    const result = await healthCheckListRepository.disable_hcl(id);
    return result.affectedRows > 0;
};

module.exports = {
    add_hcl,
    get_hcl,
    get_hclID,
    edit_hcl,
    disable_hcl
};
