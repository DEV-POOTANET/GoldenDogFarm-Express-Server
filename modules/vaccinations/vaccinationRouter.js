const express = require("express");
const router = express.Router();
const {
    add_vaccinationRecord,
    edit_vaccinationRecord,
    disable_vaccinationRecord,
    get_vaccinationRecordID,
    get_vaccinationRecordsByDog,
    get_vaccinationRecords
} = require("./vaccinationController");
const {
    add_dose,
    edit_dose,
    disable_dose,
    get_doseID,
    get_dosesByVaccination
} = require("./doseController");

// Vaccination Records Endpoints
router.get("/getVaccinationRecords", get_vaccinationRecords);
router.post("/addVaccinationRecord", add_vaccinationRecord);
router.patch("/editVaccinationRecord/:vR_ID", edit_vaccinationRecord);
router.patch("/disableVaccinationRecord/:vR_ID", disable_vaccinationRecord);
router.get("/getVaccinationRecordID/:vR_ID", get_vaccinationRecordID);
router.get("/getVaccinationRecordsByDog/:dog_ID", get_vaccinationRecordsByDog);

// Dose Schedules Endpoints
router.post("/addDose", add_dose);
router.patch("/editDose/:dS_ID", edit_dose);
router.patch("/disableDose/:dS_ID", disable_dose);
router.get("/getDoseID/:dS_ID", get_doseID);
router.get("/getDosesByVaccination/:vR_ID", get_dosesByVaccination);

module.exports = router;