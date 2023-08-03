const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    IBAN: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transferLog: {
        transfers: [
            {
                sIBAN: {
                    type: String,
                    required: true
                },
                sNAME: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                rIBAN: {
                    type: String,
                    required: true
                },
                rNAME: {
                    type: String,
                    required: true
                }
            }
        ]
    }

})

module.exports = mongoose.model("User", userSchema);