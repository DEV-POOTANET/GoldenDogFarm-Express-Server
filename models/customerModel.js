class Customer {
    constructor({
                    cus_ID,
                    cus_Name,
                    cus_Phone,
                    cus_Email,
                    cus_Facebook,
                    cus_Line,
                    cus_Status
                }) {
        this.id = cus_ID;
        this.name = cus_Name;
        this.phone = cus_Phone;
        this.email = cus_Email;
        this.facebook = cus_Facebook;
        this.line = cus_Line;
        this.status = cus_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getProfile() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            facebook: this.facebook,
            line: this.line,
            status:this.status
        };
    }
}

module.exports = Customer;
