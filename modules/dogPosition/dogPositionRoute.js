const express = require("express");
const router = express.Router();
const {
    add_dogPosition,
    get_dogPosition,
    get_dogPositionID,
    edit_dogPosition,
    disable_dogPosition,
    get_positionsByDog
} = require("./dogPositionController");

// Endpoint
// POST http://localhost:3030/api/v1/dogPositions/add
router.post("/add", add_dogPosition);

// PUT http://localhost:3030/api/v1/dogPositions/edit/:id
router.put("/edit/:id", edit_dogPosition);

// GET http://localhost:3030/api/v1/dogPositions/getDogPosition
router.get("/getDogPosition", get_dogPosition);

// GET http://localhost:3030/api/v1/dogPositions/getDogPositionID/:id
router.get("/getDogPositionID/:id", get_dogPositionID);

// PATCH http://localhost:3030/api/v1/dogPositions/disable/:id
router.patch("/disable/:id", disable_dogPosition);

// GET http://localhost:3030/api/v1/dogPositions/byDog/:dogId
router.get("/byDog/:dogId", get_positionsByDog);

module.exports = router;
