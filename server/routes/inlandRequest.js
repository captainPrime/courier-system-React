const express = require('express');
const router = express.Router();
const { InlandRequest } = require("../models/inlandRequest");
const { InventoryRequest } = require("../models/Inventoy")
const { auth } = require("../middleware/auth");

//=================================
//             Shipping Request
//=================================

router.post("/InlandRequest", auth, (req, res, next) => {
    if (req.body.cargo === 'vehicle') {
        const inlandrequest = new InlandRequest({
            writer: req.body.writer,
            userEmail: req.user.email,
            uid: req.body.uid,
            datevalue: req.body.datevalue,
            cargo: req.body.cargo,
            cargodescription: req.body.cargodescription,
            origination: req.body.origination,
            destination: req.body.destination,
            period: req.body.period,
            description: req.body.year + " " + req.body.make + " " + req.body.model,
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
                lot: req.body.lot,
                fullDescription: req.body.description
            },
            vendor: req.body.Vendor,
            consignee: req.body.Consignee,
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
            },
            vendor: req.body.Vendor,
            consignee: req.body.Consignee,
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

router.post("/Inventory", auth, (req, res, next) => {
    if (req.body.Requesttype === 'Vehicle') {
        const inventoryRequest = new InventoryRequest({
            writer: req.body.writer,
            userEmail: req.user.email,
            uid: req.body.uid,
            description: req.body.Year + " " + req.body.Make + " " + req.body.Model,
            destination: req.body.ToCountry + "," + " " +
                req.body.ToState + "," + " " +
                req.body.ToPort,
            origination: req.body.FromCountry + "," + " " +
                req.body.FromState + "," + " " +
                req.body.FromPort,
            FullDescription: {
                identifier: req.body.Vin,
                year: req.body.Year,
                make: req.body.Make,
                model: req.body.Model,
                trim: req.body.Trim,
                bodyType: req.body.BodyType,
                engineType: req.body.EngineType,
                engineLiters: req.body.EngineLiters,
                engineCyl: req.body.EngineCyl,
                color: req.body.Color,
            },
            Note: req.body.Note,
            vendor: req.body.Vendor,
            consignee: req.body.Consignee,
        });

        inventoryRequest.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                doc
            });
        });
    }
    else if (req.body.Requesttype === 'Dry Cargo') {
        const inventoryRequest = new InventoryRequest({
            writer: req.body.writer,
            userEmail: req.user.email,
            uid: req.body.uid,
            po: req.body.PO,
            description: req.body.Description,
            destination: req.body.ToCountry + "," + " " +
                req.body.ToState + "," + " " +
                req.body.ToPort,
            origination: req.body.FromCountry + "," + " " +
                req.body.FromState + "," + " " +
                req.body.FromPort,
            Note: req.body.Note,
            vendor: req.body.Vendor,
            consignee: req.body.Consignee,
        });

        inventoryRequest.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                doc
            });
        });
    }

});


module.exports = router;