const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Actor = require("../models/actorModel")

const findAll = async (req, res, next) => {
    /* #swagger.description = "Retrieve all actors in the actors collection"
    #swagger.tags = ["actors"] */
    try {
        const result = await Actor.find()
        
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No actor found."
            })
        }
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    /* #swagger.description = "Retrieve a particular actor by ID"
    #swagger.tags = ["actors"] */
    try {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }

        const result = await Actor.findById(id)
        
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Actor not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { findAll, findById }