const momentRoute = require("express").Router()
const momentController = require("../controllers/momentController")
const { validateMoment, validatePartialMoment, handleValidation } = require("../utils/momentValidation")
const { requiresAuth } = require("express-openid-connect")

momentRoute.get("/", momentController.findAll)
momentRoute.get("/:id", momentController.findById)
momentRoute.post("/search", validatePartialMoment, handleValidation, momentController.findByQuery)
momentRoute.post("/", requiresAuth(), validateMoment, handleValidation, momentController.createMoment)
momentRoute.put("/:id", requiresAuth(),  validateMoment, handleValidation, momentController.updateMomentById)
momentRoute.delete("/:id", requiresAuth(),  momentController.deleteMomentById)
momentRoute.delete("/", requiresAuth(), momentController.deleteAll)

module.exports = momentRoute