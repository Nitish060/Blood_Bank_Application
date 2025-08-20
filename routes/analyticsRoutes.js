const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { bloodGroupDetails } = require('../controllers/analyticsController')

const router = express.Router()

//routes

//Getting blood group details
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetails)




module.exports = router