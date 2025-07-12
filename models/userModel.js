class User {
    constructor({
                    user_ID,
                    user_Email,
                    user_Password,
                    user_Name,
                    user_Phone,
                    user_Role,
                    user_Status,
                }) {
        this.id = user_ID;
        this.email = user_Email;
        this.password = user_Password;
        this.name = user_Name;
        this.phone = user_Phone;
        this.role = user_Role;
        this.status = user_Status;
    }

    isActive() {
        return this.status === "1";
    }

    isAdmin() {
        return this.role === "A";
    }

    disable() {
        this.status = "2";
    }

    getProfile() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role,
        };
    }
}

module.exports = User;
