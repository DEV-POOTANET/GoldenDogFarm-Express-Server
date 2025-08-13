class VaccineList {
    constructor({
                    vaccine_ID,
                    vaccine_Name,
                    vaccine_Description,
                    vaccine_Status
                }) {
        this.id = vaccine_ID;
        this.name = vaccine_Name;
        this.description = vaccine_Description;
        this.status = vaccine_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getVaccineList() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status
        };
    }
}

module.exports = VaccineList;