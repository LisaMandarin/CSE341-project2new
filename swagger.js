const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "cse341-project2new.onrender.com",
    // host:"localhost:3000",
    schemes: ['https']
}

const outputFile = "./swagger.json"
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)