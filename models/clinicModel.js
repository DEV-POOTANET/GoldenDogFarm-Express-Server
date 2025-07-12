class Clinic {
    constructor({
                    clinic_ID,
                    clinic_Name,
                    clinic_Address,
                    clinic_Phone,
                    clinic_Status
                }) {
        this.id = clinic_ID;
        this.name = clinic_Name;
        this.address = clinic_Address;
        this.phone = clinic_Phone;
        this.status = clinic_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getClinic() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            phone: this.phone,
            status: this.status
        };
    }
}

module.exports = Clinic;
