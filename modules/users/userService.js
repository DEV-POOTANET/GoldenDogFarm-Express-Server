const userRepository = require("./userRepository");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const add_user = async (email, password, name, phone, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const inserted = await userRepository.add_user(email, hashedPassword, name, phone, role);

    if (!inserted) {
        throw new Error("Insert failed");
    }

    // ดึง user ที่เพิ่มล่าสุด (หรือ return จาก insert ก็ได้)
    const newUser = await userRepository.get_userID(inserted.insertId);

    return new User(newUser);
};

const edit_user = async (id, email, password, name, phone, role) => {
    const existingUser = await userRepository.get_userID(id);
    if (!existingUser) return null;

    const updates = {};

    if (email) updates.email = email;
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (role) updates.role = role;

    if (password && password.trim() !== "") {
        updates.password = await bcrypt.hash(password, 10);
    }

    const result = await userRepository.edit_user(id, updates);

    if (result.affectedRows === 0) return null;

    const updatedUser = await userRepository.get_userID(id);
    return new User(updatedUser);
};

const get_users = async ({ name, role, page, limit }) => {
    const rawUsers = await userRepository.get_users({ name, role, page, limit });

    // แปลงแต่ละรายการให้เป็น object ของ User class
    const users = rawUsers.users.map(user => new User(user));

    return {
        users: users,
        total: rawUsers.total
    };
};

const get_userID = async (id) => {
    const user = await userRepository.get_userID(id);
    return user ? new User(user) : null;
};

const disable_user = async (userId) => {
    const rawUser = await userRepository.get_userID(userId);
    if (!rawUser) return null;

    const user = new User(rawUser);
    user.disable();

    const result = await userRepository.disable_user(user.id);
    return result.affectedRows > 0;
};

module.exports = { add_user,get_users , get_userID ,disable_user,edit_user };
