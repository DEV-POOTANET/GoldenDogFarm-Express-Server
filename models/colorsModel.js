class Colors {
    constructor({
                    color_ID,
                    color_Name,
                    color_Status
                }) {
        this.id = color_ID;
        this.name = color_Name;
        this.status = color_Status;
    }

    isActive() {
        return this.status === "1";
    }

    disable() {
        this.status = "2";
    }

    getColor() {
        return {
            id: this.id,
            name: this.name,
            status: this.status
        };
    }
}

module.exports = Colors;