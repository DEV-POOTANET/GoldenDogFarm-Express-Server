const express = require("express");
const router = express.Router();
const {
    get_clinic,
    get_clinicID,
    disable_clinic,
    add_clinic,
    edit_clinic
} = require("./clinicController");

// Endpoint
// POST http://localhost:3030/api/v1/clinics/addClinic
router.post("/addClinic", add_clinic);

// Endpoint
// PUT http://localhost:3030/api/v1/clinics/editClinic/:id
router.put("/editClinic/:id", edit_clinic);

// Endpoint
// GET http://localhost:3030/api/v1/clinics/getClinic
router.get("/getClinic", get_clinic);

// Endpoint
// GET http://localhost:3030/api/v1/clinics/getClinicID/:id
router.get("/getClinicID/:id", get_clinicID);

// Endpoint
// PATCH http://localhost:3030/api/v1/clinics/disableClinic/:id
router.patch("/disableClinic/:id", disable_clinic);

module.exports = router;
