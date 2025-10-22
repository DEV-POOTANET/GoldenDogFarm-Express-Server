const dogRepository = require("./dogRepository");
const Dog = require("../../models/dogModel");
const path = require("path");
const dogImgRepository = require("../dogImg/dogImgRepository");
const fs = require("fs");

const uploadDirs = {
    profile: path.join(__dirname, "../../Uploads/dogs/profile"),
    pedigree: path.join(__dirname, "../../Uploads/dogs/pedigreePdf"),
    pedigreeImg: path.join(__dirname, "../../Uploads/dogs/pedigreeImg"),
    show: path.join(__dirname, "../../Uploads/dogs/show")
};

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

const edit_dog = async (id, dogData, files) => {
    const existing = await dogRepository.get_dogID(id);
    if (!existing) return null;

    const updates = {};
    if (dogData.dog_Microchip) updates.dog_Microchip = dogData.dog_Microchip;
    if (dogData.dog_RegNo) updates.dog_RegNo = dogData.dog_RegNo;
    if (dogData.dog_Name) updates.dog_Name = dogData.dog_Name;
    if (dogData.dog_CallName) updates.dog_CallName = dogData.dog_CallName;
    if (dogData.dog_Birthday) updates.dog_Birthday = dogData.dog_Birthday;
    if (dogData.dog_Status) updates.dog_Status = dogData.dog_Status;
    if (dogData.dog_StatusBreeding) updates.dog_StatusBreeding = dogData.dog_StatusBreeding;
    if (dogData.dog_StatusSale) updates.dog_StatusSale = dogData.dog_StatusSale;
    if (dogData.dog_StatusDel) updates.dog_StatusDel = dogData.dog_StatusDel;
    if (dogData.dog_Owner) updates.dog_Owner = dogData.dog_Owner;
    if (dogData.dog_Breeder) updates.dog_Breeder = dogData.dog_Breeder;
    if (dogData.dog_Gender) updates.dog_Gender = dogData.dog_Gender;
    if (dogData.dog_K9Url) updates.dog_K9Url = dogData.dog_K9Url;
    if (dogData.dog_Price) updates.dog_Price = dogData.dog_Price;
    if (dogData.color_ID) updates.color_ID = dogData.color_ID;
    if (dogData.dog_Dad !== undefined) updates.dog_Dad = dogData.dog_Dad;
    if (dogData.dog_Mom !== undefined) updates.dog_Mom = dogData.dog_Mom;
    if (dogData.breeding_ID !== undefined) updates.breeding_ID = dogData.breeding_ID;

    // จัดการไฟล์
    const profileImage = files?.profile ? files.profile[0].filename : null;
    const pedigreePDF = files?.pedigree ? files.pedigree[0].filename : null;
    const pedigreeImg = files?.pedigreeImg ? files.pedigreeImg[0].filename : null;
    const showImages = files?.show ? files.show.map(f => f.filename) : [];

    // validate files
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

    if (pedigreePDF) updates.dog_PedigreePDF = pedigreePDF;

    const result = await dogRepository.edit_dog(id, updates);
    if (result.affectedRows === 0) return null;

    // จัดการรูปภาพ
    await handleImageUpdates(id, dogData, profileImage, pedigreeImg, showImages, pedigreePDF, existing);

    const updated = await dogRepository.get_dogID(id);
    return new Dog(updated);
};

async function handleImageUpdates(dogID, dogData, profileImage, pedigreeImg, showImages, pedigreePDF, existing) {
    // Profile
    if (dogData.delete_profile === "true") {
        if (existing.mainImage) {
            try {
                fs.unlinkSync(path.join(uploadDirs.profile, existing.mainImage));
            } catch (err) {
                console.error("Error deleting profile image:", err);
            }
        }
        await dogImgRepository.delete_dog_image(dogID, "1");
    } else if (profileImage) {
        if (existing.mainImage) {
            try {
                fs.unlinkSync(path.join(uploadDirs.profile, existing.mainImage));
            } catch (err) {
                console.error("Error deleting old profile image:", err);
            }
        }
        await dogImgRepository.update_or_add_dog_image(dogID, profileImage, "1");
    }

    // Pedigree PDF
    if (dogData.delete_pedigree === "true") {
        if (existing.dog_PedigreePDF) {
            try {
                fs.unlinkSync(path.join(uploadDirs.pedigree, existing.dog_PedigreePDF));
            } catch (err) {
                console.error("Error deleting pedigree PDF:", err);
            }
        }
        await dogRepository.update_pedigree_pdf(dogID, null);
    } else if (pedigreePDF) {
        if (existing.dog_PedigreePDF) {
            try {
                fs.unlinkSync(path.join(uploadDirs.pedigree, existing.dog_PedigreePDF));
            } catch (err) {
                console.error("Error deleting old pedigree PDF:", err);
            }
        }
        await dogRepository.update_pedigree_pdf(dogID, pedigreePDF);
    }

    // Pedigree Image
    if (dogData.delete_pedigreeImg === "true") {
        if (existing.pedigreeImage) {
            try {
                fs.unlinkSync(path.join(uploadDirs.pedigreeImg, existing.pedigreeImage));
            } catch (err) {
                console.error("Error deleting pedigree image:", err);
            }
        }
        await dogImgRepository.delete_dog_image(dogID, "2");
    } else if (pedigreeImg) {
        if (existing.pedigreeImage) {
            try {
                fs.unlinkSync(path.join(uploadDirs.pedigreeImg, existing.pedigreeImage));
            } catch (err) {
                console.error("Error deleting old pedigree image:", err);
            }
        }
        await dogImgRepository.update_or_add_dog_image(dogID, pedigreeImg, "2");
    }

    // Show Images
    if (dogData.delete_show_all === "true") {
        for (const img of existing.showImages) {
            try {
                fs.unlinkSync(path.join(uploadDirs.show, img.url));
            } catch (err) {
                console.error("Error deleting show image:", err);
            }
        }
        await dogImgRepository.delete_dog_images_by_type(dogID, "3");
    } else if (dogData.delete_show_ids) {
        const ids = dogData.delete_show_ids.split(",");
        for (const imgId of ids) {
            const img = await dogImgRepository.get_image_by_id(imgId);
            if (img) {
                try {
                    fs.unlinkSync(path.join(uploadDirs.show, img.img_URL));
                } catch (err) {
                    console.error("Error deleting show image:", err);
                }
                await dogImgRepository.delete_dog_image_by_id(imgId);
            }
        }
    }
    if (showImages.length > 0) {
        for (const img of showImages) {
            await dogImgRepository.add_dog_image(dogID, img, "3");
        }
    }
}

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