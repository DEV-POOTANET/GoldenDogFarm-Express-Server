const express = require("express");
const router = express.Router();
const {
    add_customer,
    edit_customer,
    get_customers,
    get_customerID,
    disable_customer
} = require("./customerController");

// POST http://localhost:3030/api/v1/customers/addCustomer
router.post("/addCustomer", add_customer);

// PUT http://localhost:3030/api/v1/customers/editCustomer/:id
router.put("/editCustomer/:id", edit_customer);

// GET http://localhost:3030/api/v1/customers/getCustomers?name=xxx&phone=xxx&facebook=xxx&page=1&limit=10
router.get("/getCustomers", get_customers);

// GET http://localhost:3030/api/v1/customers/getCustomerID/:id
router.get("/getCustomerID/:id", get_customerID);

// PATCH http://localhost:3030/api/v1/customers/disableCustomer/:id
router.patch("/disableCustomer/:id", disable_customer);

module.exports = router;
