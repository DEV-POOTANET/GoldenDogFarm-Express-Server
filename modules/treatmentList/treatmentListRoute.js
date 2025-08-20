const express = require("express");
const router = express.Router();
const {
    add_treatment,
    get_treatment,
    get_treatmentID,
    edit_treatment,
    disable_treatment
} = require("./treatmentListController");

// POST http://localhost:3030/api/v1/treatmentList/addTreatment
router.post("/addTreatment", add_treatment);

// GET http://localhost:3030/api/v1/treatmentList/getTreatment
router.get("/getTreatment", get_treatment);

// GET http://localhost:3030/api/v1/treatmentList/getTreatmentID/:id
router.get("/getTreatmentID/:id", get_treatmentID);

// PUT http://localhost:3030/api/v1/treatmentList/editTreatment/:id
router.put("/editTreatment/:id", edit_treatment);

// PATCH http://localhost:3030/api/v1/treatmentList/disableTreatment/:id
router.patch("/disableTreatment/:id", disable_treatment);

module.exports = router;
