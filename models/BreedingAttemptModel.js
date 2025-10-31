const moment = require("moment-timezone");

class BreedingAttempt {
    constructor(data) {
        this.id = data.attempt_ID;
        this.breedId = data.breed_ID;
        this.fatherId = data.father_ID;
        this.date = data.attempt_Date;
        this.notes = data.attempt_Notes;
        this.typeBreed = data.attempt_TypeBreed;
        this.status = data.attempt_Status;

        // join data
        this.fatherName = data.father_Name || null;
    }

    isActive() {
        return this.status !== '4';
    }

    disable() {
        this.status = '4';
    }

    getProfile() {
        // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD โดยใช้ timezone Asia/Bangkok
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };

        return {
            id: this.id,
            breedId: this.breedId,
            father: {
                id: this.fatherId,
                name: this.fatherName
            },
            date: formatDate(this.date),
            notes: this.notes,
            typeBreed: this.typeBreed,
            status: this.status
        };
    }
}

module.exports = BreedingAttempt;