class DogPosition {
    constructor({
                    dp_ID,
                    dog_ID,
                    position_ID,
                    dp_Year,
                    dp_Status,
                    dog_Name,
                    position_Name
                }) {
        this.id = dp_ID;
        this.dogId = dog_ID;
        this.positionId = position_ID;
        this.year = dp_Year;
        this.status = dp_Status;
        this.dogName = dog_Name;
        this.positionName = position_Name;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getDogPosition() {
        return {
            id: this.id,
            dogId: this.dogId,
            positionId: this.positionId,
            year: this.year,
            status: this.status,
            dogName: this.dogName,
            positionName: this.positionName
        };
    }
}

module.exports = DogPosition;
