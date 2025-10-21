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
const dogRoutes = require('../modules/dogs/dogRoutes');
const breedingRoutes = require('../modules/breeding/breedingRouter');
const dogPositionRoutes = require('../modules/dogPosition/dogPositionRoute');
const vaccinationRoutes = require('../modules/vaccinations/vaccinationRouter');
const dogHealthCheckRoutes = require('../modules/dogHealthCheck/dogHealthCheckRoutes');
const treatmentRecordRoutes = require('../modules/treatmentRecord/treatmentRecordRoute');
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

router.use('/dogs', authenticateToken, dogRoutes);

router.use('/breedings',authenticateToken, breedingRoutes);

router.use('/dogPositions',authenticateToken, dogPositionRoutes);

router.use('/vaccinations',authenticateToken, vaccinationRoutes);

router.use('/dogHealthCheck',authenticateToken, dogHealthCheckRoutes);

router.use('/treatmentRecord',authenticateToken, treatmentRecordRoutes);

module.exports = router;
