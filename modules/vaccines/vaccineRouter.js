const express = require("express");
const router = express.Router();
const {
    add_vaccine,
    get_vaccine,
    get_vaccineID,
    edit_vaccine,
    disable_vaccine
} = require("./vaccineController");

// Endpoint
// POST http://localhost:3030/api/v1/vaccines/addVaccine
router.post("/addVaccine", add_vaccine);

// Endpoint
// PUT http://localhost:3030/api/v1/vaccines/editVaccine/:id
router.put("/editVaccine/:id", edit_vaccine);

// Endpoint
// GET http://localhost:3030/api/v1/vaccines/getVaccine
router.get("/getVaccine", get_vaccine);

// Endpoint
// GET http://localhost:3030/api/v1/vaccines/getVaccineID/:id
router.get("/getVaccineID/:id", get_vaccineID);

// Endpoint
// PATCH http://localhost:3030/api/v1/vaccines/disableVaccine/:id
router.patch("/disableVaccine/:id", disable_vaccine);

module.exports = router;