const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "My API",
        description: "This API allows users to manage the collection of actors and moments in the TV series -- Grey's Anatomy"
    },
    // host: "cse341-project2new.onrender.com",
    host:"localhost:3000",
    // schemes: ['https'],
    components: {
        securitySchemes: {
            oAuth: {
                type: "oauth2",
                description: "This API uses OAuth 2 with the implicit grant flow.",
                flows: {
                    implicit: {
                        authorizationUrl: "https://dev-uecjmd1r2nd5b6cq.jp.auth0.com/authorize",
                        scopes: {}
                    }
                }
            }
        }
    },
    security: [
        {
            oAuth: []
        }
    ]
}

const outputFile = "./swagger.json"
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)