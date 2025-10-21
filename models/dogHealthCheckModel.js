const moment = require("moment-timezone");

class DogHealthCheck {
    constructor(data) {
        this.id = data.dHC_ID;
        this.dogId = data.dog_ID;
        this.hclId = data.hCL_ID;
        this.vetId = data.vet_ID;
        this.scheduledDate = data.dHC_ScheduledDate;
        this.actualDate = data.dHC_ActualDate;
        this.notes = data.dHC_Notes;
        this.status = data.dHC_Status;
        this.result = data.dHC_Result;

        // join data
        this.dogName = data.dog_Name || null;
        this.hclName = data.hCL_Name || null;
        this.vetName = data.vet_Name || null;
    }

    getProfile() {
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };
        return {
            id: this.id,
            dog: {
                id: this.dogId,
                name: this.dogName
            },
            healthCheckList: {
                id: this.hclId,
                name: this.hclName
            },
            vet: {
                id: this.vetId,
                name: this.vetName
            },
            scheduledDate: formatDate(this.scheduledDate),
            actualDate: formatDate(this.actualDate),
            notes: this.notes,
            status: this.status,
            result: this.result
        };
    }


}

module.exports = DogHealthCheck;
