const { Schema, model } = require("mongoose")

const momentSchema = new Schema({
    season: { type: Number, required: true},
    episode: { type: Number, required: true},
    title: { type: String, required: true},
    airDate: { type: Date, required: true},
    plotSummary: { type: String, required: true},
    youtubeURL: { type: String, required: true},
    actors: [{
        type: String,
        required: true
    }]
}, 
{
    timestamps: true
})

const momentModel = model("Moment", momentSchema)

module.exports = momentModel