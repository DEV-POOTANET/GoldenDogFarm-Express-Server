const moment = require("moment-timezone");

class Breeding {
    constructor({
                    breed_ID,
                    mother_ID,
                    breed_DueDate,
                    breed_ActualBirth,
                    breed_Notes,
                    puppy_Count,
                    breed_Status
                }) {
        this.id = breed_ID;
        this.motherId = mother_ID;
        this.dueDate = breed_DueDate;
        this.actualBirthDate = breed_ActualBirth;
        this.notes = breed_Notes;
        this.puppyCount = puppy_Count;
        this.status = breed_Status;
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
            motherId: this.motherId,
            dueDate: formatDate(this.dueDate),
            actualBirthDate: formatDate(this.actualBirthDate),
            notes: this.notes,
            puppyCount: this.puppyCount,
            status: this.status
        };
    }
}

module.exports = Breeding;