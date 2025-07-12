class Vet {
    constructor({
                    vet_ID,
                    vet_Name,
                    vet_Phone,
                    vet_Clinic_ID,
                    vet_Status
                }) {
        this.id = vet_ID;
        this.name = vet_Name;
        this.phone = vet_Phone;
        this.clinicId = vet_Clinic_ID;
        this.status = vet_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getVet() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            clinicId: this.clinicId,
            status: this.status
        };
    }
}

module.exports = Vet;
