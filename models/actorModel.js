const { Schema, model } = require("mongoose")

const actorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'others'], required: true, lowercase: true, message: "{VALUE} is not a valid gender"},
    character: { type: String, required: true },
    dateOfBirth: { type: Date, required: false },
    nationality: { type: String, required: false },
    firstAppearSeason: { type: Number, required: true},
    seasons: [{
        type: Number,
        required: true
    }]
},
{
    timestamps: true
})

const actorModel = model("Actor", actorSchema)

module.exports = actorModel