const express = require("express");
const router = express.Router();
const {
    add_hcl,
    get_hcl,
    get_hclID,
    edit_hcl,
    disable_hcl
} = require("./healthCheckListController");

// POST http://localhost:3030/api/v1/healthCheckList/add_hcl
router.post("/add_hcl", add_hcl);

// GET http://localhost:3030/api/v1/healthCheckList/get_hcl
router.get("/get_hcl", get_hcl);

// GET http://localhost:3030/api/v1/healthCheckList/get_hclID/:id
router.get("/get_hclID/:id", get_hclID);

// PUT http://localhost:3030/api/v1/healthCheckList/edit_hcl/:id
router.put("/edit_hcl/:id", edit_hcl);

// PATCH http://localhost:3030/api/v1/healthCheckList/disable_hcl/:id
router.patch("/disable_hcl/:id", disable_hcl);

module.exports = router;
