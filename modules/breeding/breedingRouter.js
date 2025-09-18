const express = require("express");
const router = express.Router();
const {
    add_breeding,
    edit_breeding,
    get_breedings,
    get_breedingID,
    disable_breeding
} = require("./breedingController");

// POST http://localhost:3030/api/v1/breedings/addBreeding
router.post("/addBreeding", add_breeding);

// PUT http://localhost:3030/api/v1/breedings/editBreeding/:id
router.put("/editBreeding/:id", edit_breeding);

// GET http://localhost:3030/api/v1/breedings/getBreedings?status=xxx&year=xxx&month=xxx&page=1&limit=10
router.get("/getBreedings", get_breedings);

// GET http://localhost:3030/api/v1/breedings/getBreedingID/:id
router.get("/getBreedingID/:id", get_breedingID);

// PATCH http://localhost:3030/api/v1/breedings/disableBreeding/:id
router.patch("/disableBreeding/:id", disable_breeding);

module.exports = router;