const express = require("express");
const router = express.Router();
const {
    get_treatmentRecords,
    add_treatmentRecord,
    update_treatmentRecord,
    disable_treatmentRecord
} = require("./treatmentRecordController");

// GET http://localhost:3030/api/v1/treatmentRecord/getTreatmentRecords?status=1&dogName=Lucky&page=1&limit=10
router.get("/getTreatmentRecords", get_treatmentRecords);

// POST http://localhost:3030/api/v1/treatmentRecord/addTreatmentRecord
router.post("/addTreatmentRecord", add_treatmentRecord);

// PUT http://localhost:3030/api/v1/treatmentRecord/updateTreatmentRecord/:id
router.put("/updateTreatmentRecord/:id", update_treatmentRecord);

// PATCH http://localhost:3030/api/v1/treatmentRecord/disableTreatmentRecord/:id
router.patch("/disableTreatmentRecord/:id", disable_treatmentRecord);

module.exports = router;