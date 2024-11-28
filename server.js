const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const app = express()
const port = process.env.PORT
const mongodbURI = process.env.MONGODB_URI
const connectDB = require("./models/index")
const router = require("./routes")
const errorHandling = require("./utils/errorHandling")



if (!port) {
    throw new Error("Port is not defined in the env file")
}
if (!mongodbURI) {
    throw new Error("Invalid MongoDB URI")
}

connectDB(mongodbURI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})
app.use(errorHandling)

app.listen(port, () => {console.log(`Server application listening on port ${port}`)})
