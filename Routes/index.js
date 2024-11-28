const router = require("express").Router()
const actorRoute = require("./actorRoute")

router.use("/actors", actorRoute)

router.get("/", (req, res) => {
    const docLink = 'https://cse341-project2-h5oa.onrender.com/api-docs'
    res.status(200).json({
        success: true,
        URL: docLink
    })
})

module.exports = router