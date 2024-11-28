const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Actor = require("../models/actorModel")

exports.findAll = async (req, res, next) => {
    // #swagger.description = "Retrieve all actors in the actors collection"
    // #swagger.tags = ["actors"]
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
                message: "No actors found."})
        }
    } catch (error) {
        next(error)
    }
}