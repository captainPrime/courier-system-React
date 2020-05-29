const express = require('express');
const router = express.Router();
const { InlandRequest } = require("../models/inlandRequest");

const { auth } = require("../middleware/auth");

//=================================
//             Shipping Request
//=================================

router.post("/InlandRequest", auth, (req, res, next) => {
    if (req.body.cargo === 'vehicle') {
        const inlandrequest = new InlandRequest({
            writer: req.body.writer,
            uid: req.body.uid,
            datevalue: req.body.datevalue,
            cargo: req.body.cargo,
            cargodescription: req.body.cargodescription,
            origination: req.body.origination,
            destination: req.body.destination,
            period: req.body.period,
            description: req.body.description,
            destination: req.body.destination,
            typeOFRequest: req.body.typeOFRequest,
            cargodescription: {
                identifier: req.body.vin,
                year: req.body.year,
                make: req.body.make,
                model: req.body.model,
                buyer: req.body.buyer,
                measurement: req.body.vehiclemeasurement,
                height: req.body.height,
                dimension: req.body.dimension,
                width: req.body.width,
                weight: req.body.weight,
                lot: req.body.lot     
            }
        });

        inlandrequest.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                doc
            });
        });
    }
    else if (req.body.cargo === 'dry cargo') {
        const inlandrequest = new InlandRequest({
            writer: req.body.writer,
            uid: req.body.uid,
            datevalue: req.body.datevalue,
            cargo: req.body.cargo,
            cargodescription: req.body.cargodescription,
            origination: req.body.origination,
            destination: req.body.destination,
            period: req.body.period,
            description: req.body.description,
            destination: req.body.destination,
            typeOFRequest: req.body.typeOFRequest,
            cargodescription: {
                identifier: req.body.po,
                destination2: req.body.destination2,
                lot: req.body.lot2,
                buyer: req.body.buyer2,
                measurement: req.body.measurement2,
                height: req.body.height2,
                dimension: req.body.dimension2,
                width: req.body.width2,
                weight: req.body.weight2
            }
        });

        inlandrequest.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                doc
            });
        });
    }

});


module.exports = router;