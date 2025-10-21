const express = require("express");
const router = express.Router();
const {
    get_dogHealthChecks,
    add_dogHealthCheck,
    update_dogHealthCheck,
    disable_dogHealthCheck
} = require("./dogHealthCheckController");

// GET http://localhost:3030/api/v1/dogHealthCheck/getDogHealthChecks?status=1&result=2&dogName=Lucky&page=1&limit=10
router.get("/getDogHealthChecks", get_dogHealthChecks);

// POST http://localhost:3030/api/v1/dogHealthCheck/addDogHealthCheck
router.post("/addDogHealthCheck", add_dogHealthCheck);

// PUT http://localhost:3030/api/v1/dogHealthCheck/updateDogHealthCheck/:id
router.put("/updateDogHealthCheck/:id", update_dogHealthCheck);

// PATCH http://localhost:3030/api/v1/dogHealthCheck/disableDogHealthCheck/:id
router.patch("/disableDogHealthCheck/:id", disable_dogHealthCheck);

module.exports = router;
