const mongoose = require('mongoose');
const Schema = mongoose.Schema
const shippingRequestSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    uid: {
        type: String
    },
    dimension: {
        type: String,
        maxlength: 50
    },
    cargo: {
        type: String
    },
    fromcountry: {
        type: String
    },
    tocountry: {
        type: String
    },
    tostate: {
        type: String
    },
    fromport: {
        type: String
    },
    toport: {
        type: String
    },
    tocity: {
        type: String
    },
    fromcity: {
        type: String
    },
    description: {
        type: String
    },
    movementtype: {
        type: String
    },
    declare: {
        type: String
    },
    fromstate: {
        type: String
    },
    note: {
        type: String
    },
    mode: {
        type: String
    },
    weight: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    pieces: {
        type: Number,
        default: 0
    },
    tozip: {
        type: Number
    },
    fromzip: {
        type: Number
    },
    hwd1: {
        type: Number
    },
    hwd2: {
        type: Number
    },
    hwd3: {
        type: Number
    },
    datevalue: {
        type: String
    },

    status: {
        type: String,
        default: 'Warehouse'
    },

    origination: {
        type: String
    },

    destination: {
        type: String
    },

    typeOFRequest: {
        type: String,
    },


    trackingID: {
        type: String
    }
    //know when shipping request was made 
}, { timestamps: true })

const ShippingRequest = mongoose.model('ShippingRequest', shippingRequestSchema);
module.exports = { ShippingRequest }