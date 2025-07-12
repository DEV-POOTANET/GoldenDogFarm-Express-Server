const express = require("express");
const router = express.Router();


const authenticateToken = require("../middleware/auth");

const userRoutes = require('../modules/users/userRoutes');
const authRoutes = require('../modules/auth/authRoutes');
const colorsRoutes = require('../modules/colors/colorsRoutes');
const positionRoutes = require('../modules/position/positionRoutes');
const clinicRoutes = require('../modules/clinic/clinicRoutes');
const vetRoutes = require('../modules/vet/vetRoutes');

router.use('/auth',authRoutes);

router.use('/users', authenticateToken,userRoutes);

router.use('/colors',authenticateToken,colorsRoutes);

router.use('/position',authenticateToken,positionRoutes );

router.use('/clinics',authenticateToken,clinicRoutes);

router.use('/vets',authenticateToken,vetRoutes);

module.exports = router;
