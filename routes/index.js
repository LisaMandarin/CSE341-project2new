const router = require("express").Router()
const swaggerRouter = require("./swaggerRoute")
const actorRouter = require("./actorRoute")


router.get("/", (req, res) => {
    const docLink = "https://cse341-project2new.onrender.com/api-docs"
    res.status(200).json({
        success: true,
        message: "Hello",
        URL: docLink
    })
})
router.use("/api-docs", swaggerRouter)
router.use("/actors", actorRouter)

module.exports = router