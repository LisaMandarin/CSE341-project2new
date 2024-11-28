const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Actor = require("../models/actorModel")

Actor.findAll = async (req, res, next) => {
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

module.exports = Actor