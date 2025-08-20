const mongoose = require("mongoose")
const inventoryModel = require("../models/inventoryModel")
const userModel = require("../models/userModel")

//CREATE Inventory
const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body
        //validation
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not Found");
        }

        if (req.body.inventoryType == 'out') {
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.organisation)
            //calculation for blood quantity

            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup
                    }
                }, {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])

            const totalIn = totalInOfRequestedBlood[0]?.total || 0

            //total out blood quantity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0

            // Calculation of in & out
            const availableQuantityOfBloodGroup = totalIn - totalOut

            //Validation of Quantity
            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup} UNIT Of ${requestedBloodGroup.toUpperCase()} Is Available`
                })
            }
            req.body.hospital = user?._id
        } else {
            req.body.donor = user?._id;
        }

        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: "New Blood Record Added"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating Inventory API',
            error
        })
    }
}

//GET All Blood Records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.userId
        }).populate('donor').populate('hospital').sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Get all records successfully",
            inventory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Get All Inventory',
            error
        })
    }
}

//get blood record of five
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.userId
        }).limit(5).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            message: "Recent Inventory Data",
            inventory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Recent Inventory API",
            error
        })
    }
}

//get donor records
const getDonorsController = async (req, res) => {
    try {
        const organisation = req.userId
        //finding donors
        const donorId = await inventoryModel.distinct("donor", {
            organisation
        })
        const donors = await userModel.find({ _id: { $in: donorId } })

        return res.status(200).send({
            success: true,
            message: 'Donor Record is Fetched Successfully',
            donors,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Donor Records',
            error
        })
    }
}

//Get hospitals
const getHospitalController = async (req, res) => {
    try {
        const organisation = req.userId
        //finding hospitals
        const hospitalId = await inventoryModel.distinct("hospital", {
            organisation
        })
        const hospitals = await userModel.find({ _id: { $in: hospitalId } })
        return res.status(200).send({
            success: true,
            message: "Hospital Data is Fetched Successfully",
            hospitals,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes: false,
            message: 'Error in get hospital API',
            error
        })
    }
}

//Get organisation record
const getOrganisationController = async (req, res) => {
    try {
        const donor = req.userId
        const orgId = await inventoryModel.distinct('organisation', {
            donor
        })
        // finding org
        const organisations = await userModel.find({ _id: { $in: orgId } })
        return res.status(200).send({
            success: true,
            message: "Organisation Data is Fetched Successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error In Org API',
            error
        })
    }
}

//Get organisation  record for hospital
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.userId
        const orgId = await inventoryModel.distinct('organisation', {
            hospital
        })
        // finding org
        const organisations = await userModel.find({ _id: { $in: orgId } })
        return res.status(200).send({
            success: true,
            message: "Hospital's Organisation Data is Fetched Successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Hospital's Org API",
            error
        })
    }
}

//GET All Hospital Records
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate('donor')
            .populate('hospital')
            .populate('organisation')
            .sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Get hospital consumer records successfully",
            inventory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Get Consumer Inventory',
            error
        })
    }
}

module.exports = { createInventoryController, getInventoryController, getDonorsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController}