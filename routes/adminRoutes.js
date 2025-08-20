const { getDonorsListController, getHospitalsListController, getOrganisationsListController, deleteDonorController, deleteHospitalController, deleteOrganisationController } = require('../controllers/adminController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const express = require('express')

//Routes
const router = express.Router()

//->get donar list
router.get('/donor-list', authMiddleware, adminMiddleware, getDonorsListController)

//->get hospital list
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalsListController)

//->get organisation list
router.get('/organisation-list', authMiddleware, adminMiddleware, getOrganisationsListController)

//delete donor
router.delete('/delete-donor/:id', authMiddleware, adminMiddleware, deleteDonorController)

//delete hospital
router.delete('/delete-hospital/:id', authMiddleware, adminMiddleware, deleteHospitalController)

//delete organisation
router.delete('/delete-organisation/:id', authMiddleware, adminMiddleware, deleteOrganisationController)

//Export
module.exports = router