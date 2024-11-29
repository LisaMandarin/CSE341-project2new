const actorRoute = require("express").Router()
const actorController = require("../controllers/actorController")
const { validateActor, validatePartialActor, handleValidation } = require("../utils/actorValidation")
const { requiresAuth } = require("express-openid-connect")

actorRoute.get("/", actorController.findAll)
actorRoute.get("/:id", actorController.findById)
actorRoute.post("/search", validatePartialActor, handleValidation, actorController.findByQuery)
actorRoute.post("/", requiresAuth(), validateActor, handleValidation, actorController.createActor)
actorRoute.put('/:id', requiresAuth(), validateActor, handleValidation, actorController.updateActorById)
actorRoute.delete('/:id', requiresAuth(), actorController.deleteActorById)
actorRoute.delete('/', requiresAuth(), actorController.deleteAll)

module.exports = actorRoute