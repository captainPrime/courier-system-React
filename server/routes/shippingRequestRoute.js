const express = require('express');
const router = express.Router();
const { ShippingRequest } = require("../models/ShippingRequest");
const { InlandRequest } = require("../models/inlandRequest");
const { auth } = require("../middleware/auth");

//=================================
//             Shipping Request
//=================================

router.post("/shippingRequest", auth, (req, res, next) => {

    const shippingrequest = new ShippingRequest({
        writer: req.body.writer,
        userEmail: req.user.email,
        uid: req.body.uid,
        dimension: req.body.dimension,
        cargo: req.body.cargo,
        fromcountry: req.body.fromcountry,
        tocountry: req.body.tocountry,
        tostate: req.body.tostate,
        fromport: req.body.fromport,
        toport: req.body.toport,
        tocity: req.body.tocity,
        fromcity: req.body.fromcity,
        description: req.body.description,
        movementtype: req.body.movementtype,
        declare: req.body.declare,
        fromstate: req.body.fromstate,
        note: req.body.note,
        mode: req.body.mode,
        quantity: req.body.quantity,
        pieces: req.body.pieces,
        tozip: req.body.tozip,
        fromzip: req.body.fromzip,
        hwd1: req.body.hwd1,
        hwd2: req.body.hwd2,
        hwd3: req.body.hwd3,
        typeOFRequest: req.body.typeOFRequest,
        datevalue: req.body.datevalue,
        destination: req.body.tocountry + "," + " " +
            req.body.tostate + "," + " " +
            req.body.toport + "," + " " +
            req.body.tozip,
        origination: req.body.fromcountry + "," + " " +
            req.body.fromstate + "," + " " +
            req.body.fromport + "," + " " +
            req.body.fromzip,
        vendor: req.body.Vendor,
        consignee: req.body.Consignee,
    })

    shippingrequest.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            doc
        });
    });
});

router.post("/getShippingRequest", auth, (req, res) => {

    const order = req.body.order ? req.body.order : 'desc'
    const sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    const limit = req.body.limit ? parseInt(req.body.limit) : 100
    const skip = parseInt(req.body.skip)

    let type = req.query.type
    if (type === 'Shipping Request') {
        ShippingRequest.find({ writer: req.user._id })
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, AllShippingRequest) => {

                //console.log(AllShippingRequest)
                if (err) return res.status(400).json({
                    success: false,
                    message: 'failed to fetch request'
                })

                return res.status(200).json({
                    success: true,
                    AllShippingRequest,
                    postLength: AllShippingRequest.length
                })
            })
    }


    else if (type === 'Inland Request') {
        InlandRequest.find({ writer: req.user._id })
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, AllShippingRequest) => {

                if (err) return res.status(400).json({
                    success: false,
                    message: 'failed to fetch request'
                })

                return res.status(200).json({
                    success: true,
                    AllShippingRequest,
                    postLength: AllShippingRequest.length
                })
            })
    }

    else if (type === 'search') {
        console.log(req.body.searchvalue)
        InlandRequest.findOne({ "cargodescription.identifier": req.body.searchvalue, writer: req.user._id })
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, shipment) => {
                console.log(shipment)
                if (err) return res.status(400).json({

                    success: false,
                    message: 'failed to fetch request'
                })

                return res.status(200).json({
                    success: true,
                    AllShippingRequest: shipment,

                })
            })
    }

    else if (type === 'location') {

        const result = []

        InlandRequest.find(
            { "status": req.body.location, writer: req.user._id },
            (err, shipments) => {

                /* for (i = 0; i < shipment.length; i++) {
                    result.push(shipment[i]) */

                ShippingRequest.find({ "status": req.body.location, writer: req.user._id })
                    .populate('writer')
                    .sort([[sortBy, order]])
                    .skip(skip)
                    .limit(limit)
                    .exec((err, shipment) => {
                        /* for (i = 0; i < shipment.length; i++) {
                            shipments.push(shipment[i])

                            console.log((shipment[i])) */

                        shipment.forEach((item, index) => {

                            console.log(item)
                            shipments.push(item)
                        })

                        if (err) return res.status(400).json({

                            success: false,
                            message: 'failed to fetch request'
                        })

                        return res.status(200).json({
                            success: true,
                            AllShippingRequest: shipments,
                            postLength: shipments.length
                        })

                    })
            }
            /* } */
        )

    }


});

router.post("/getAdminInlandRequest", (req, res) => {

    const order = req.body.order ? req.body.order : 'desc'
    const sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    const limit = req.body.limit ? parseInt(req.body.limit) : 100
    const skip = parseInt(req.body.skip)

    InlandRequest.find()
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, shipment) => {
            if (err) return res.status(400).json({

                success: false,
                message: 'failed to fetch request'
            })

            return res.status(200).json({
                success: true,
                AllShippingRequest: shipment,

            })
        })

})
router.post("/getAdminShippingRequest", (req, res) => {

    const order = req.body.order ? req.body.order : 'desc'
    const sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    const limit = req.body.limit ? parseInt(req.body.limit) : 100
    const skip = parseInt(req.body.skip)

    ShippingRequest.find()
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, shipment) => {
            if (err) return res.status(400).json({

                success: false,
                message: 'failed to fetch request'
            })

            return res.status(200).json({
                success: true,
                AllShippingRequest: shipment,

            })
        })

})

router.get("/shipment_by_id", (req, res) => {

    let type = req.query.type
    let shipmentId = req.query.id
    if (type === "inland request") {
        let shipmentId = req.query.id
        InlandRequest.find({ '_id': { $in: shipmentId } })
            .populate('writer')
            .exec((err, shipment) => {
                if (err) return res.status(400).send(err)
                return res.status(200).send(shipment)
            })
    }

    else if (type === "shipping request") {
        ShippingRequest.find({ '_id': { $in: shipmentId } })
            .populate('writer')
            .exec((err, shipment) => {
                if (err) return res.status(400).send(err)
                return res.status(200).send(shipment)

            })
    }
});

router.post("/updateRequest", (req, res) => {
    let type = req.query.type
    let shipmentId = req.query.id
    if (type === "inland request") {
        InlandRequest.findOneAndUpdate(
            { _id: shipmentId },
            {
                $set: {
                    trackingID: req.body.trackingid,
                    status: req.body.status
                }
            },
            { new: true },
            (err) => {
                if (err) res.status(400).send(err)
                res.status(200).json({
                    success: true,
                })
            }
        )
    }

    else if (type === "shipping request") {
        ShippingRequest.findOneAndUpdate(
            { _id: shipmentId },
            {
                $set: {
                    trackingID: req.body.trackingid,
                    status: req.body.status
                }
            },
            { new: true },
            (err) => {
                if (err) res.status(400).send(err)
                res.status(200).json({
                    success: true,
                })
            }
        )
    }
})

module.exports = router;