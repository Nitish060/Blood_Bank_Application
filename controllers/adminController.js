const userModel = require('../models/userModel')

//getting donor list
const getDonorsListController = async (req, res) => {
    try {
        const donorData = await userModel.find({role: 'donor'}).sort({createdAt: -1})

        return res.status(200).send({
            success: true,
            totalCount: donorData.length,
            message: "Donor List is Fetched Successfully",
            donorData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Donor List API",
            error
        })
    }
}

//getting hospital list
const getHospitalsListController = async (req, res) => {
    try {
        const hospitalData = await userModel.find({role: 'hospital'}).sort({createdAt: -1})

        return res.status(200).send({
            success: true,
            totalCount: hospitalData.length,
            message: "Hospital List is Fetched Successfully",
            hospitalData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Hospital List API",
            error
        })
    }
}

//geting organisation list
const getOrganisationsListController = async (req, res) => {
    try {
        const organisationData = await userModel.find({role: 'organisation'}).sort({createdAt: -1})

        return res.status(200).send({
            success: true,
            totalCount: organisationData.length,
            message: "Organisation List is Fetched Successfully",
            organisationData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Organisation List API",
            error
        })
    }
}

//delte donor
const deleteDonorController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Donor Record Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error While Deleting Donor',
            error
        })
    }
}

//delete hospital
const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Hospital Record Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error While Deleting Hospital',
            error
        })
    }
}

//delete organisation
const deleteOrganisationController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Organisation Record Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error While Organisation Donor',
            error
        })
    }
}

//Export
module.exports = {getDonorsListController, getHospitalsListController, getOrganisationsListController, deleteDonorController, deleteHospitalController, deleteOrganisationController}