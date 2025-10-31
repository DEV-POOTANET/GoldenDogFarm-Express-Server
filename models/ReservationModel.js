const moment = require("moment-timezone");

class Reservation {
    constructor(data) {
        this.id = data.reservation_ID;
        this.breedId = data.breed_ID;
        this.dogId = data.dog_ID;
        this.cusId = data.cus_ID;
        this.userId = data.user_ID;
        this.date = data.reservation_Date;
        this.deposit = data.reservation_Deposit;
        this.status = data.reservation_Status;
        this.cancelReason = data.reservation_CancelReason;
        this.depositStatus = data.reservation_DepositStatus;
        this.cancelDate = data.reservation_CancelDate;
        this.notes = data.reservation_Notes;

        // join data
        this.breedDueDate = data.breed_DueDate || null;
        this.dogName = data.dog_Name || null;
        this.cusName = data.cus_Name || null;
        this.userName = data.user_Name || null;
    }

    getProfile() {
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };
        return {
            id: this.id,
            breed: {
                id: this.breedId,
                dueDate: formatDate(this.breedDueDate)
            },
            dog: {
                id: this.dogId,
                name: this.dogName
            },
            customer: {
                id: this.cusId,
                name: this.cusName
            },
            user: {
                id: this.userId,
                name: this.userName
            },
            date: formatDate(this.date),
            deposit: this.deposit,
            status: this.status,
            cancelReason: this.cancelReason,
            depositStatus: this.depositStatus,
            cancelDate: formatDate(this.cancelDate),
            notes: this.notes
        };
    }
}

module.exports = Reservation;