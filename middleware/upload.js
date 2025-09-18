const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile") {
            cb(null, "uploads/dogs/profile/");
        } else if (file.fieldname === "pedigree") {
            cb(null, "uploads/dogs/pedigreePdf/");
        } else if (file.fieldname === "pedigreeImg") {
            cb(null, "uploads/dogs/pedigreeImg/");
        } else if (file.fieldname === "show") {
            cb(null, "uploads/dogs/show/");
        } else {
            cb(null, "uploads/others/");
        }
    },
    filename: (req, file, cb) => {
        const random3 = Math.floor(Math.random() * 1000) // เลขสุ่ม 0-999
            .toString()
            .padStart(3, "0");

        const uniqueSuffix = Date.now() + "-" + random3;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }


});

const upload = multer({ storage });

module.exports = upload;
