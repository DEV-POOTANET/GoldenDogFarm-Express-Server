const express = require("express");
const router = express.Router();
const {
    add_breedingAttempt,
    edit_breedingAttempt,
    get_breedingAttempts,
    get_breedingAttemptID,
    disable_breedingAttempt
} = require("./breedingAttemptController");

// POST http://localhost:3030/api/v1/breedingAttempts/addBreedingAttempt
router.post("/addBreedingAttempt", add_breedingAttempt);

// PUT http://localhost:3030/api/v1/breedingAttempts/editBreedingAttempt/:id
router.put("/editBreedingAttempt/:id", edit_breedingAttempt);

// GET http://localhost:3030/api/v1/breedingAttempts/getBreedingAttempts?status=xxx&year=xxx&month=xxx&page=1&limit=10
router.get("/getBreedingAttempts", get_breedingAttempts);

// GET http://localhost:3030/api/v1/breedingAttempts/getBreedingAttemptID/:id
router.get("/getBreedingAttemptID/:id", get_breedingAttemptID);

// PATCH http://localhost:3030/api/v1/breedingAttempts/disableBreedingAttempt/:id
router.patch("/disableBreedingAttempt/:id", disable_breedingAttempt);

module.exports = router;