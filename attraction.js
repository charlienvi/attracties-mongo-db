const mongoose = require("mongoose");

const { Schema, model } = mongoose;
/*
* De plugin mongoose-unique-validator voegt pre-save validatie toe binnen een mongoose schema
* als je nu een attractie met dezelfde naam probeert in te geven, wordt dit tegengehouden
* volgens de FAQ van mongoose: https://mongoosejs.com/docs/faq.html
* Mongoose doesn't handle unique on its own: { name: { type: String, unique: true } } is just a shorthand for creating a MongoDB unique index on name.
*/
const uniqueValidator = require('mongoose-unique-validator');

const Responsible = require("./responsible");

// Schema
const attractionSchema = new Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true,
        unique: true,
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

attractionSchema.plugin(uniqueValidator);

//Model
const Attraction = model("Attraction", attractionSchema, "attractions");

module.exports = Attraction;