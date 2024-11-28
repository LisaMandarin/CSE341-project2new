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

const findByQuery = async (req, res, next) => {
    /* #swagger.description = "Find a particular actor by query"
    #swagger.tags = ["actors"] 
    #swagger.parameters["body"] = {
    in: "body",
    description: "fieldName: value",
    required: true,
    type: "string",
    }*/
    try {
        const query = req.body

        if (!query || Object.keys(query).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Query parameters are required"
            })
        }

        actorQuery = {}
        
        for (const key in query) {
            if (key === "season") {
                actorQuery[key] = { $in: query[key]}
            } else if (key === "character") {
                actorQuery[key] = { $regex: query[key], $options: "i"}
            } else {
                actorQuery[key] = query[key]
            }
        }

        const result = await Actor.find(actorQuery)

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No actor(s) found."
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

const createActor = async (req, res, next) => {
    /* #swagger.description = "Create a new actor"
    #swagger.tags = ["actors"]
    #swagger.security = [ {openID: []}] */
    try {
        const {
            firstName,
            lastName,
            gender,
            character,
            dateOfBirth,
            nationality,
            firstAppearSeason,
            seasons
        } = req.body

        if (!firstName || !lastName || !gender || !character || !firstAppearSeason || !seasons) {
            return res.status(400).json({
                success: false,
                message: "Invalid parameters: firstName, lastName, gender, character, firstAppearSeason, and seasons are required."
            })   
        }

        const newActor = new Actor({
            firstName,
            lastName,
            gender,
            character,
            dateOfBirth,
            nationality,
            firstAppearSeason,
            seasons
        })

        const result = await newActor.save()
        return res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { findAll, findById, findByQuery, createActor }