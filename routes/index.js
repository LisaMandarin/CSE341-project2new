const router = require("express").Router()
const swaggerRouter = require("./swaggerRoute")
const actorRouter = require("./actorRoute")


router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello"
    })
})
router.use("/api-docs", swaggerRouter)
router.use("/actors", actorRouter)

module.exports = router