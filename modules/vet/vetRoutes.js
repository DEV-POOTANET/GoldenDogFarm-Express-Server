const express = require("express");
const router = express.Router();
const {
    add_vet,
    get_vet,
    get_vetID,
    edit_vet,
    disable_vet
} = require("./vetController");

// Endpoint
// POST http://localhost:3030/api/v1/vets/addVet
router.post("/addVet", add_vet);

// Endpoint
// PUT http://localhost:3030/api/v1/vets/editVet/:id
router.put("/editVet/:id", edit_vet);

// Endpoint
// GET http://localhost:3030/api/v1/vets/getVet
router.get("/getVet", get_vet);

// Endpoint
// GET http://localhost:3030/api/v1/vets/getVetID/:id
router.get("/getVetID/:id", get_vetID);

// Endpoint
// PATCH http://localhost:3030/api/v1/vets/disableVet/:id
router.patch("/disableVet/:id", disable_vet);

module.exports = router;
