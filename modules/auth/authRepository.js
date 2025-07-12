const db = require("../../config/db");
const User = require("../../models/userModel");

const findUserByEmail = async (email) => {
    const query = "SELECT user_ID, user_Email , user_Password ,user_Name ,user_Role , user_Status FROM users WHERE user_Email = ?";
    const [results] = await db.promise().query(query, [email]);

    if (results.length === 0) return null;
        return new User(results[0]);
};

module.exports = { findUserByEmail };
