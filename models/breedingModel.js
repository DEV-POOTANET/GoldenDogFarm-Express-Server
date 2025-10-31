const moment = require("moment-timezone");
const BreedingAttempt = require('./BreedingAttemptModel');

class Breeding {
    constructor(data) {
        this.id = data.breed_ID;
        this.motherId = data.mother_ID;
        this.dueDate = data.breed_DueDate;
        this.actualBirthDate = data.breed_ActualBirth;
        this.notes = data.breed_Notes;
        this.puppyCount = data.puppy_Count;
        this.status = data.breed_Status;

        // join data
        this.motherName = data.mother_Name || null;
        this.attempts = data.attempts ? data.attempts.map(a => new BreedingAttempt(a)) : [];
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
            mother: {
                id: this.motherId,
                name: this.motherName
            },
            dueDate: formatDate(this.dueDate),
            actualBirthDate: formatDate(this.actualBirthDate),
            notes: this.notes,
            puppyCount: this.puppyCount,
            status: this.status,
            attempts: this.attempts.map(a => a.getProfile())
        };
    }
}

module.exports = Breeding;