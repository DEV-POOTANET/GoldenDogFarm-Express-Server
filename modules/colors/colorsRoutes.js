const express = require("express");
const router = express.Router();
const { get_color ,
        get_colorID ,
        disable_color,
        add_color,
        edit_color} = require("./colorsController")

// Endpoint
// POST http://localhost:3030/api/v1/colors/addColor
router.post("/addColor", add_color);

// Endpoint
// PUT http://localhost:3030/api/v1/colors/editColor/:id
router.put("/editColor/:id", edit_color);

// Endpoint
// GET http://localhost:3030/api/v1/colors/getColor
router.get("/getColor", get_color);

// Endpoint
// GET http://localhost:3030/api/v1/colors/getColorID/:id
router.get("/getColorID/:id", get_colorID);

// Endpoint
// PATCH http://localhost:3030/api/v1/colors/disableColor/:id
router.patch("/disableColor/:id", disable_color);

module.exports = router;