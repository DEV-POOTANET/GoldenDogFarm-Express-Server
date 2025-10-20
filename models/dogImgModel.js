class DogImg {
    constructor({
                    img_ID,
                    dog_ID,
                    img_URL,
                    img_Type,
                    img_Status
                }) {
        this.id = img_ID;
        this.dogId = dog_ID;
        this.url = img_URL;
        this.type = img_Type; // '1' = profile, '2' = pedigree, '3' = show
        this.status = img_Status; // '1' = active, '2' = inactive
    }

    isActive() {
        return this.status === '1';
    }

    disable() {
        this.status = '2';
    }

    getDogImg() {
        return {
            id: this.id,
            dogId: this.dogId,
            url: this.url,
            type: this.type,
            status: this.status
        };
    }
}

module.exports = DogImg;