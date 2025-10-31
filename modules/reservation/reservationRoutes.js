const express = require("express");
const router = express.Router();
const {
    get_reservations,
    add_reservation,
    update_reservation,
    disable_reservation,
    generate_pdf
} = require("./reservationController");

// GET http://localhost:3030/api/v1/reservation/getReservations?status=1&depositStatus=2&cusName=John&page=1&limit=10
router.get("/getReservations", get_reservations);

// POST http://localhost:3030/api/v1/reservation/addReservation
router.post("/addReservation", add_reservation);

// PUT http://localhost:3030/api/v1/reservation/updateReservation/:id
router.put("/updateReservation/:id", update_reservation);

// PATCH http://localhost:3030/api/v1/reservation/disableReservation/:id
router.patch("/disableReservation/:id", disable_reservation);

router.get("/generatePDF/:id", generate_pdf);
module.exports = router;