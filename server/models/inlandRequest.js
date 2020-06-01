const mongoose = require('mongoose');
const Schema = mongoose.Schema
const inlandRequestSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    userEmail: {
        type: String
    },

    uid: {
        type: String
    },

    datevalue: {
        type: String
    },
    cargo: {
        type: String
    },

    cargodescription: {
        type: Array
    },
    origination: {
        type: String
    },
    destination: {
        type: String
    },
    period: {
        type: String
    },
    description: {
        type: String
    },
    destination: {
        type: String
    },

    status: {
        type: String,
        default: 'pending'
    },

    typeOFRequest: {
        type: String
    },

    trackingID: {
        type: String
    }
    //know when shipping request was made 
}, { timestamps: true })

const InlandRequest = mongoose.model('InlandRequest', inlandRequestSchema);
module.exports = { InlandRequest }