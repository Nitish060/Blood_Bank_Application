const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getDonorsController, getRecentInventoryController } = require('../controllers/inventoryController')

const router = express.Router()

//routes
//ADD inventory --> POST
router.post('/create-inventory', authMiddleware, createInventoryController)

//GET All Blood Records
router.get('/get-inventory', authMiddleware, getInventoryController)

//GET Recent Blood Records
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController)

//GET Hospital Blood Records
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController)

//GET All donor Records
router.get('/get-donors', authMiddleware, getDonorsController)

//GET All Hospital Records
router.get('/get-hospitals', authMiddleware, getHospitalController)

//GET All Organisation Records
router.get('/get-organisation', authMiddleware, getOrganisationController)

//GET Organisation-for-hospital Records
router.get('/get-organisation-for-hospital', authMiddleware, getOrganisationForHospitalController)

module.exports = router