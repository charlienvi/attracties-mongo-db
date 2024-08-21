const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const Responsible = require("./responsible");

// Schema
const attractionSchema = new Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true,
        index: true
    },
    responsible: {
        type: Schema.Types.ObjectId,
        ref: Responsible,
        required: true
    },
    minimumLength: {
        type: Number,
        min: 80,
        max: 220,
        required: true
    },
    categories: {
        type: [{
            type: String,
            lowercase: true,
            enum: ["thrill", "kinderen", "familie", "water","fantasie","voor de allerkleinsten"],
        }]
    },
    numberOfPersons: {
        type: Number,
        required: true
    },
    vip: {
        type: Boolean,
        default: false
    },
    indoor: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


//Model
const Attraction = model("Attraction", attractionSchema, "attractions");

module.exports = Attraction;