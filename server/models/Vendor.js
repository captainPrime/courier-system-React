const mongoose = require('mongoose');
const Schema = mongoose.Schema
const vendorSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    UI: {
        type: String
    },

    Account: {
        type: String
    },

    Company: {
        type: String
    },

    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },


    SalesRep: {
        type: String
    },
    Country: {
        type: String
    },
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    City: {
        type: String
    },


    ZIP: {
        type: String
    },

    IDNumber: {
        type: String
    },
    IDType: {
        type: String
    },
    Phone1: {
        type: String
    },
    Phone2: {
        type: String
    },
    Email: {
        type: String
    },
    Others: {
        type: String
    },

    typeOfRequest: {
        type: String,
        default: "Vendor"
    }
    //know when shipping request was made 
}, { timestamps: true })

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = { Vendor }