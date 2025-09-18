const dogRepository = require("./dogRepository");
const Dog = require("../../models/dogModel");
const path = require("path");
const dogImgRepository = require("../dogImg/dogImgRepository");
const add_dog = async (dogData, files) => {

    // ตรวจสอบ dog_Dad และ dog_Mom
    if (dogData.dog_Dad) {
        const dad = await dogRepository.get_dogID(dogData.dog_Dad);
        if (!dad) {
            throw new Error("รหัสพ่อพันธุ์ (dog_Dad) ไม่มีอยู่ในระบบ");
        }
        // if (dad.dog_Gender !== "M" || !["1", "2"].includes(dad.dog_Status)) {
        //     throw new Error("dog_Dad ต้องเป็นสุนัขตัวผู้ที่มีสถานะพ่อพันธุ์ ('1' หรือ '2')");
        // }
        if (dad.dog_Gender !== "M" ) {
            throw new Error("dog_Dad ต้องเป็นสุนัขตัวผู้");
        }

    }
    if (dogData.dog_Mom) {
        const mom = await dogRepository.get_dogID(dogData.dog_Mom);
        if (!mom) {
            throw new Error("รหัสแม่พันธุ์ (dog_Mom) ไม่มีอยู่ในระบบ");
        }
        // if (mom.dog_Gender !== "F" || mom.dog_Status !== "3") {
        //     throw new Error("dog_Mom ต้องเป็นสุนัขตัวเมียที่มีสถานะแม่พันธุ์ ('3')");
        // }
        if (mom.dog_Gender !== "F") {
            throw new Error("dog_Mom ต้องเป็นสุนัขตัวเมีย");
        }
    }


    const profileImage = files.profile ? files.profile[0].filename : null;
    const pedigreePDF = files.pedigree ? files.pedigree[0].filename : null;
    const pedigreeImg = files.pedigreeImg ? files.pedigreeImg[0].filename : null;
    const showImages = files.show ? files.show.map(f => f.filename) : [];

    // validate
    if (pedigreePDF && path.extname(pedigreePDF).toLowerCase() !== ".pdf") {
        throw new Error("ไฟล์ Pedigree ต้องเป็น .pdf เท่านั้น");
    }
    if (profileImage && ![".jpg", ".jpeg", ".png"].includes(path.extname(profileImage).toLowerCase())) {
        throw new Error("Profile ต้องเป็น .jpg, .jpeg หรือ .png");
    }
    if (pedigreeImg && ![".jpg", ".jpeg", ".png"].includes(path.extname(pedigreeImg).toLowerCase())) {
        throw new Error("Pedigree Image ต้องเป็น .jpg, .jpeg หรือ .png");
    }
    if (showImages.length > 4) {
        throw new Error("Show images ต้องไม่เกิน 4 รูป");
    }

    // เพิ่มข้อมูลสุนัข
    const inserted = await dogRepository.add_dog({
        ...dogData,
        dog_PedigreePDF: pedigreePDF || null
    });

    if (!inserted) throw new Error("ไม่สามารถเพิ่มข้อมูลสุนัขได้");

    const dogID = inserted.insertId;

    // เพิ่มรูปภาพ
    if (profileImage) {
        await dogImgRepository.add_dog_image(dogID, profileImage, "1");
    }
    if (pedigreeImg) {
        await dogImgRepository.add_dog_image(dogID, pedigreeImg, "2");
    }
    for (const img of showImages) {
        await dogImgRepository.add_dog_image(dogID, img, "3");
    }

    // คืนค่า object
    const newDog = await dogRepository.get_dogID(dogID);
    return new Dog(newDog);
};

const edit_dog = async (
    id,
    microchip,
    regNo,
    name,
    callName,
    birthday,
    status,
    statusBreeding,
    statusSale,
    statusDel,
    owner,
    breeder,
    gender,
    k9Url,
    price,
    colorID,
    dad,
    mom,
    breedingID
) => {
    const existing = await dogRepository.get_dogID(id);
    if (!existing) return null;

    const updates = {};
    if (microchip) updates.dog_Microchip = microchip;
    if (regNo) updates.dog_RegNo = regNo;
    if (name) updates.dog_Name = name;
    if (callName) updates.dog_CallName = callName;
    if (birthday) updates.dog_Birthday = birthday;
    if (status) updates.dog_Status = status;
    if (statusBreeding) updates.dog_StatusBreeding = statusBreeding;
    if (statusSale) updates.dog_StatusSale = statusSale;
    if (statusDel) updates.dog_StatusDel = statusDel;
    if (owner) updates.dog_Owner = owner;
    if (breeder) updates.dog_Breeder = breeder;
    if (gender) updates.dog_Gender = gender;
    if (k9Url) updates.dog_K9Url = k9Url;
    if (price) updates.dog_Price = price;
    if (colorID) updates.color_ID = colorID;
    if (dad !== undefined) updates.dog_Dad = dad;
    if (mom !== undefined) updates.dog_Mom = mom;
    if (breedingID !== undefined) updates.breeding_ID = breedingID;

    const result = await dogRepository.edit_dog(id, updates);
    if (result.affectedRows === 0) return null;

    const updated = await dogRepository.get_dogID(id);
    return new Dog(updated);
};

const get_dogs = async ({ dog_Name, dog_Status, dog_StatusBreeding, dog_StatusSale, dog_Gender, page, limit }) => {
    const raw = await dogRepository.get_dogs({ dog_Name, dog_Status, dog_StatusBreeding, dog_StatusSale, dog_Gender, page, limit });
    return {
        dogs: raw.dogs.map(d => new Dog(d)),
        total: raw.total
    };
};
const get_dogID = async (dogID) => {
    const raw = await dogRepository.get_dogID(dogID);
    return new Dog(raw);
};

const disable_Dog = async (dogID) => {
    return await dogRepository.disable_Dog(dogID);
};

module.exports = {add_dog, edit_dog ,get_dogs,get_dogID,disable_Dog};