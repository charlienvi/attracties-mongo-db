const mongoose = require("mongoose");
const moment = require("moment");

const { Schema, model } = mongoose;

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    houseNumber: {
        type: Number,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                if(this.country.toLowerCase() === 'belgië'){
                    console.log(+value);
                    return (+value >= 1000 && +value <= 9999)
                } else {
                    return true
                }
            },
            message: 'Het formaat van de postcode komt niet overeen met het gekozen land. Alle belgische huisnummers liggen tussen 1000 en 9999.'
        }
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "België"
    }
});

// Schema
const responsibleSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function (value) {

                const minBirthDate = moment().subtract(18, 'years');
                const maxBirthDate = moment().subtract(65,'years');
                const dateToEval = moment(value);
                return (dateToEval <= minBirthDate  && dateToEval >= maxBirthDate)
            },
            message: "Een verantwoordelijke moet meerderjarig zijn en jonger dan 65 jaar."
        }
    }

}, {
    timestamps: true
});

responsibleSchema.index(
    { firstName: 1, lastName: 1, dateOfBirth: 1},
    { unique: 'true' }
    );

//Model
const Responsible = model("Responsible", responsibleSchema, "responsibles");

module.exports = Responsible;
