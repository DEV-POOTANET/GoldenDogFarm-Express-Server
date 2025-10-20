const moment = require("moment-timezone");

class VaccinationRecord {
    constructor({
                    vR_ID,
                    vaccine_ID,
                    dog_ID,
                    user_ID,
                    vR_Status
                }) {
        this.vR_ID = vR_ID;
        this.vaccine_ID = vaccine_ID;
        this.dog_ID = dog_ID;
        this.user_ID = user_ID;
        this.vR_Status = vR_Status;
    }

    setStatus(status) {
        this.vR_Status = status;
    }

    getVaccinationRecord() {

        return {
            vR_ID: this.vR_ID,
            vaccine_ID: this.vaccine_ID,
            dog_ID: this.dog_ID,
            user_ID: this.user_ID,
            vR_Status: this.vR_Status
        };
    }
}

class DoseSchedule {
    constructor({
                    dS_ID,
                    vR_ID,
                    vet_ID,
                    dS_Number,
                    dS_ScheduledDate,
                    dS_ActualDate,
                    dS_Notes,
                    dS_Status
                }) {
        this.dS_ID = dS_ID;
        this.vR_ID = vR_ID;
        this.vet_ID = vet_ID;
        this.dS_Number = dS_Number;
        this.dS_ScheduledDate = dS_ScheduledDate;
        this.dS_ActualDate = dS_ActualDate;
        this.dS_Notes = dS_Notes;
        this.dS_Status = dS_Status;
    }

    getDoseSchedule() {
        // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD โดยใช้ timezone Asia/Bangkok
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };
        return {
            dS_ID: this.dS_ID,
            vR_ID: this.vR_ID,
            vet_ID: this.vet_ID,
            dS_Number: this.dS_Number,
            dS_ScheduledDate: formatDate(this.dS_ScheduledDate),
            dS_ActualDate: formatDate(this.dS_ActualDate),
            dS_Notes: this.dS_Notes,
            dS_Status: this.dS_Status
        };
    }
}

module.exports = { VaccinationRecord, DoseSchedule };