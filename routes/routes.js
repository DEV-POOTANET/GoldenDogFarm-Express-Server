const express = require("express");
const router = express.Router();


const authenticateToken = require("../middleware/auth");

const userRoutes = require('../modules/users/userRoutes');
const authRoutes = require('../modules/auth/authRoutes');
const colorsRoutes = require('../modules/colors/colorsRoutes');
const positionRoutes = require('../modules/position/positionRoutes');
const clinicRoutes = require('../modules/clinic/clinicRoutes');
const vetRoutes = require('../modules/vet/vetRoutes');
const  vaccinesRoutes = require('../modules/vaccines/vaccineRouter');
const  healthCheckListRoutes = require('../modules/healthCheckList/healthCheckListRoute');
const treatmentListRoutes = require('../modules/treatmentList/treatmentListRoute');
const  customerRoutes = require('../modules/customers/customerRoute');
router.use('/auth',authRoutes);

router.use('/users', authenticateToken,userRoutes);

router.use('/colors',authenticateToken,colorsRoutes);

router.use('/position',authenticateToken,positionRoutes );

router.use('/clinics',authenticateToken,clinicRoutes);

router.use('/vets',authenticateToken,vetRoutes);

router.use('/vaccines',authenticateToken,vaccinesRoutes);

router.use('/healthCheckList',authenticateToken,healthCheckListRoutes);

router.use('/treatmentList',authenticateToken,treatmentListRoutes);

router.use('/customers',authenticateToken,customerRoutes);

module.exports = router;
