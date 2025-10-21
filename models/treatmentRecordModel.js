const moment = require("moment-timezone");

class treatmentRecordModel {
    constructor(data) {
        this.id = data.tR_ID;
        this.tlId = data.tL_ID;
        this.dogId = data.dog_ID;
        this.vetId = data.vet_ID;
        this.userId = data.user_ID;
        this.status = data.tR_Status;
        this.startDate = data.tR_StartDate;
        this.endDate = data.tR_EndDate;

        // join data
        this.dogName = data.dog_Name || null;
        this.tlName = data.tL_Name || null;
        this.vetName = data.vet_Name || null;
        this.userName = data.user_Name || null;
    }

    getProfile() {
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };
        return {
            id: this.id,
            treatmentList: {
                id: this.tlId,
                name: this.tlName
            },
            dog: {
                id: this.dogId,
                name: this.dogName
            },
            vet: {
                id: this.vetId,
                name: this.vetName
            },
            user: {
                id: this.userId,
                name: this.userName
            },
            startDate: formatDate(this.startDate),
            endDate: formatDate(this.endDate),
            status: this.status
        };
    }
}

module.exports = treatmentRecordModel;