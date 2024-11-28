const actorRoute = require("express").Router()
const actorController = require("../controllers/actorController")


actorRoute.get('/', actorController.findAll)


module.exports = actorRoute