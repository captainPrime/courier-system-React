const mongoose = require('mongoose');
const Schema = mongoose.Schema
const inventoryRequestSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    description: {
        type: String
    },

    userEmail: {
        type: String
    },

    uid: {
        type: String
    },

    status: {
        type: String,
        default: 'pending'
    },

    Requesttype: {
        type: String
    },

    trackingID: {
        type: String
    },
    vendor: {
        type: String
    },
    VehicleCondition: {
        type: String
    },

    consignee: {
        type: String
    },
    FromPort: {
        type: String
    },
    FromState: {
        type: String
    },
    ToState: {
        type: String
    },
    ToCountry: {
        type: String
    },
    FromCountry: {
        type: String
    },
    Country: {
        type: String
    },
    ToPort: {
        type: String
    },

    Note: {
        type: String
    },

    Color: {
        type: String
    },
    origination: {
        type: String
    },
    destination: {
        type: String
    },
    FullDescription: {
        type: Array
    },

    //know when shipping request was made 
}, { timestamps: true })

const InventoryRequest = mongoose.model('InventoryRequest', inventoryRequestSchema);
module.exports = { InventoryRequest }