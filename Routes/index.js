const router = require("express").Router()
const swaggerRouter = require("./swaggerRoute")


router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello"
    })
})
router.use("/api-docs", swaggerRouter)

module.exports = router