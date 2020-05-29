const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Admin } = require("../models/Admin");

const { auth } = require("../middleware/auth");
const { adminAuth } = require("../middleware/admin");


const bcrypt = require('bcrypt');
const saltRounds = 10;


//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.get("/adminAuth", adminAuth, (req, res) => {
    res.status(200).json({
        _id: req.admin._id,
        isAdmin: req.admin.role === 0 ? false : true,
        isAuth: true,
        email: req.admin.email,
        role: req.admin.role,
        image: req.admin.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

/* router.post("/registerAdmin", (req, res) => {

    const admin = new Admin({ email: 'taiwooyindamola@gmail.com', password: 'superdude007' });

    admin.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
}); */

router.post("/Admin", (req, res) => {
    Admin.findOne({ email: req.body.email }, (err, admin) => {
        if (!admin)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        admin.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            admin.generateToken((err, admin) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", admin.tokenExp);
                res
                    .cookie("w_auth", admin.token)
                    .status(200)
                    .json({
                        loginSuccess: true, adminId: admin._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.get("/getUser", auth, (req, res) => {
    User.findOne({ email: req.user.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({
                success: false,
                message: 'failed to fetch user'
            })

            return res.status(200).json({
                success: true,
                userInfo: [user]
            })
        })
})

router.post("/updateProfile", auth, (req, res) => {

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return (err);

        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return (err);
            req.body.password = hash

            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $set: {
                        name: req.body.name,
                        lastName: req.body.lastName,
                        company: req.body.company,
                        country: req.body.country,
                        state: req.body.state,
                        city: req.body.city,
                        zip: req.body.zip,
                        address1: req.body.address1,
                        address2: req.body.address2,
                        phone1: req.body.phone1,
                        phone2: req.body.phone2,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    }
                },

                { new: true },
                (err) => {
                    if (err) {
                        return res.json({ success: false, err })
                    }


                    res.status(200).json({ success: true })

                }
            )


        })
    })




    // console.log('password changed')



});

module.exports = router;
