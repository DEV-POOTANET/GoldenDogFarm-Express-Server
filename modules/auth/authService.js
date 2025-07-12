const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./authRepository");

require("dotenv").config();

const login = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("Email or Password Invalid");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error("Email or Password Invalid");
    }

    if (!user.isActive()) throw new Error("User Not Active");

    const token = jwt.sign(
        {
            id: user.id,
            username: user.name,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h", algorithm: "HS256" }
    );

    return token;
};

module.exports = { login };
