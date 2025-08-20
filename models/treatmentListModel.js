class TreatmentList {
    constructor({ tL_ID, tL_Name, tL_Description, tL_Status }) {
        this.tL_ID = tL_ID;
        this.tL_Name = tL_Name;
        this.tL_Description = tL_Description;
        this.tL_Status = tL_Status;
    }

    getTreatmentList() {
        return {
            id: this.tL_ID,
            name: this.tL_Name,
            description: this.tL_Description,
            status: this.tL_Status
        };
    }

    disable() {
        this.tL_Status = '2';
    }
}

module.exports = TreatmentList;
