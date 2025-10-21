const dogHealthCheckRepository = require("./dogHealthCheckRepository");
const DogHealthCheck = require("../../models/dogHealthCheckModel");

const get_dogHealthChecks = async (filters) => {
    const raw = await dogHealthCheckRepository.get_dogHealthChecks(filters);
    const data = raw.data.map(item => new DogHealthCheck(item));
    return { total: raw.total, data };
};

const add_dogHealthCheck = async (data) => {
    const insertId = await dogHealthCheckRepository.add_dogHealthCheck(data);
    const newRecord = await dogHealthCheckRepository.get_dogHealthCheckById(insertId);
    return new DogHealthCheck(newRecord);
};

const update_dogHealthCheck = async (id, updates) => {
    const existing = await dogHealthCheckRepository.get_dogHealthCheckById(id);
    if (!existing) return null;

    await dogHealthCheckRepository.update_dogHealthCheck(id, updates);
    const updated = await dogHealthCheckRepository.get_dogHealthCheckById(id);
    return new DogHealthCheck(updated);
};

const disable_dogHealthCheck = async (id) => {
    const existing = await dogHealthCheckRepository.get_dogHealthCheckById(id);
    if (!existing) return null;

    const result = await dogHealthCheckRepository.disable_dogHealthCheck(id);
    return result.affectedRows > 0;
};

module.exports = {
    get_dogHealthChecks,
    add_dogHealthCheck,
    update_dogHealthCheck,
    disable_dogHealthCheck
};
