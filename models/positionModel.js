class Position {
    constructor({
                    position_ID,
                    position_Name,
                    position_Status
                }) {
        this.id = position_ID;
        this.name = position_Name;
        this.status = position_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getPosition() {
        return {
            id: this.id,
            name: this.name,
            status: this.status
        };
    }
}

module.exports = Position;