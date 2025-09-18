const moment = require('moment-timezone');

class Dog {
    constructor({
                    dog_ID,
                    dog_Microchip,
                    dog_RegNo,
                    dog_Name,
                    dog_CallName,
                    dog_Birthday,
                    dog_PedigreePDF,
                    dog_Status,
                    dog_StatusBreeding,
                    dog_StatusSale,
                    dog_StatusDel,
                    dog_Owner,
                    dog_Breeder,
                    dog_Gender,
                    dog_K9Url,
                    dog_Price,
                    color_ID,
                    color_Name,
                    dog_Dad,
                    dad_Name,
                    dog_Mom,
                    mom_Name,
                    breeding_ID,
                    mainImage,
                    pedigreeImage,
                    showImages
                }) {
        this.id = dog_ID;
        this.microchip = dog_Microchip;
        this.regNo = dog_RegNo;
        this.name = dog_Name;
        this.callName = dog_CallName;
        this.birthday = dog_Birthday;
        this.pedigreePDF = dog_PedigreePDF;
        this.status = dog_Status;
        this.statusBreeding = dog_StatusBreeding;
        this.statusSale = dog_StatusSale;
        this.statusDel = dog_StatusDel;
        this.owner = dog_Owner;
        this.breeder = dog_Breeder;
        this.gender = dog_Gender;
        this.k9Url = dog_K9Url;
        this.price = dog_Price;
        this.colorID = color_ID;
        this.colorName = color_Name || null;
        this.dadID = dog_Dad;
        this.dadName = dad_Name || null;
        this.momID = dog_Mom;
        this.momName = mom_Name || null;
        this.breedingID = breeding_ID;
        this.mainImage = mainImage || null;
        this.pedigreeImage = pedigreeImage || null;
        this.showImages = showImages|| null;

    }

    getProfile() {
        const formatDate = (date) => {
            if (!date) return null;
            return moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        };

        return {
            id: this.id,
            microchip: this.microchip,
            regNo: this.regNo,
            name: this.name,
            callName: this.callName,
            birthday: formatDate(this.birthday),
            pedigreePDF: this.pedigreePDF,
            status: this.status,
            statusBreeding: this.statusBreeding,
            statusSale: this.statusSale,
            statusDel: this.statusDel,
            owner: this.owner,
            breeder: this.breeder,
            gender: this.gender,
            k9Url: this.k9Url,
            price: this.price,
            colorID: this.colorID,
            colorName: this.colorName,
            dadID: this.dadID,
            dadName: this.dadName,
            momID: this.momID,
            momName: this.momName,
            breedingID: this.breedingID,
            profileImage: this.mainImage,
            pedigreeImage: this.pedigreeImage,
            showImages: this.showImages
        };
    }

}

module.exports = Dog;
