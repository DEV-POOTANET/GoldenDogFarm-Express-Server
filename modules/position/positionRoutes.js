const express = require("express");
const router = express.Router();
const { get_position ,
        get_positionID ,
        disable_position,
        add_position,
        edit_position} = require("./positionController")

// Endpoint
// POST http://localhost:3030/api/v1/position/addPosition
router.post("/addPosition", add_position);

// Endpoint
// PUT http://localhost:3030/api/v1/position/editPosition/:id
router.put("/editPosition/:id", edit_position);

// Endpoint
// GET http://localhost:3030/api/v1/position/getPosition
router.get("/getPosition", get_position);

// Endpoint
// GET http://localhost:3030/api/v1/position/getPositionID/:id
router.get("/getPositionID/:id", get_positionID);

// Endpoint
// patch http://localhost:3030/api/v1/position/disablePosition/:id               ปิดการใช้งาน user_ID
router.patch("/disablePosition/:id", disable_position);

module.exports = router;