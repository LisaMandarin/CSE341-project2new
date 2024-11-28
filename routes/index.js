const router = require("express").Router()
const swaggerRouter = require("./swaggerRoute")
const actorRouter = require("./actorRoute")
const { requiresAuth } = require("express-openid-connect")


router.get("/", (req, res) => {
    const docLink = "https://cse341-project2new.onrender.com/api-docs"

    if (req.oidc.isAuthenticated()) {
        res.json({
            message: "Welcome, you are logged in.  Check out the API documentation.",
            URL: docLink
        })
    } else {
        res.json({
            message: "You are logged out.  You have limited permission to some endpoints.",
            URL: docLink
        })
    }
})

router.get("/profile", requiresAuth(), (req, res) => {
    /* #swagger.tags = ["profile"] */
    res.json(req.oidc.user)
})

router.use("/api-docs", swaggerRouter)
router.use("/actors", actorRouter)

module.exports = router