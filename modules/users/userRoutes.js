const express = require("express");
const router = express.Router();
const { get_users ,
        get_userID,
        disable_user,
        add_user,
        edit_user} = require("./userController")

// Endpoint
// POST http://localhost:3030/api/v1/users/addUser
router.post("/addUser", add_user);

// Endpoint
// PUT http://localhost:3030/api/v1/users/edit_user/:id
router.put("/edit_user/:id", edit_user);

// Endpoint
// GET http://localhost:3030/api/v1/users/getUserID/:id                 ดึงผู้ใช้ตาม user_ID
router.get("/getUserID/:id", get_userID);

// Endpoint
// GET http://localhost:3030/api/v1/users/getUserAll                    ดึงทั้งหมด
// GET http://localhost:3030/api/v1/users/getUserAll?name=admin         filter by name
// GET http://localhost:3030/api/v1/users/getUserAll?page=2&limit=5     pagination
// GET http://localhost:3030/api/v1/users/getUserAll?role=A&page=3      filter + pagination
router.get("/getUserAll",get_users);

// Endpoint
// GET http://localhost:3030/api/v1/users/disable_user/:id               ปิดการใช้งาน user_ID
router.patch("/disable_user/:id", disable_user);

module.exports = router;