const customerRepository = require("./customerRepository");
const Customer = require("../../models/customerModel");

const add_customer = async (name, phone, email, facebook, line) => {
    const inserted = await customerRepository.add_customer(name, phone, email, facebook, line);
    if (!inserted) throw new Error("Insert failed");

    const newCustomer = await customerRepository.get_customerID(inserted.insertId);
    return new Customer(newCustomer);
};

const edit_customer = async (id, name, phone, email, facebook, line) => {
    const existing = await customerRepository.get_customerID(id);
    if (!existing) return null;

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (email) updates.email = email;
    if (facebook) updates.facebook = facebook;
    if (line) updates.line = line;

    const result = await customerRepository.edit_customer(id, updates);
    if (result.affectedRows === 0) return null;

    const updated = await customerRepository.get_customerID(id);
    return new Customer(updated);
};

const get_customers = async ({ name, phone, facebook, page, limit }) => {
    const raw = await customerRepository.get_customers({ name, phone, facebook, page, limit });
    return {
        customers: raw.customers.map(c => new Customer(c)),
        total: raw.total
    };
};

const get_customerID = async (id) => {
    const customer = await customerRepository.get_customerID(id);
    return customer ? new Customer(customer) : null;
};

const disable_customer = async (id) => {
    const raw = await customerRepository.get_customerID(id);
    if (!raw) return null;

    const customer = new Customer(raw);
    customer.disable();

    const result = await customerRepository.disable_customer(customer.id);
    return result.affectedRows > 0;
};

module.exports = { add_customer, edit_customer, get_customers, get_customerID, disable_customer };
