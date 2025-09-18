const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const { add_dog, edit_dog ,get_dogs,get_dogID,disable_Dog} = require("./dogController");


// POST http://localhost:3030/api/v1/dogs/addDog
router.post(
    "/addDog",
    upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "pedigree", maxCount: 1 },    // pdf
        { name: "pedigreeImg", maxCount: 1 },
        { name: "show", maxCount: 4 }
    ]),
    add_dog
);

// PUT http://localhost:3030/api/v1/dogs/editDog/:id
router.put("/editDog/:id", edit_dog);

// GET http://localhost:3030/api/v1/dogs/getDogs?dog_Name=xxx&dog_Status=xxx&dog_StatusBreeding=xxx&dog_StatusSale=xxx&dog_Gender=xxx&page=1&limit=10
router.get("/getDogs", get_dogs);

//GET http://localhost:3030/api/v1/dogs/getDog/:id
router.get("/getDog/:dogID", get_dogID);

//PATCH http://localhost:3030/api/v1/dogs/disableDog/:id
router.patch("/disableDog/:id", disable_Dog);

module.exports = router;
