const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const adminSchema = mongoose.Schema({

    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },

    role: {
        type: Number,
        default: 1
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})


adminSchema.pre('save', function (next) {
    var admin = this;

    if (admin.isModified('password')) {
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(admin.password, salt, function (err, hash) {
                if (err) return next(err);
                admin.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

adminSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}


adminSchema.methods.generateToken = function (cb) {
    var admin = this;
    var token = jwt.sign(admin._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    admin.tokenExp = oneHour;
    admin.token = token;
    admin.save(function (err, admin) {
        if (err) return cb(err)
        cb(null, admin);
    })
}

adminSchema.statics.findByToken = function (token, cb) {
    var admin = this;

    jwt.verify(token, 'secret', function (err, decode) {
        admin.findOne({ "_id": decode, "token": token }, function (err, admin) {
            if (err) return cb(err);
            cb(null, admin);
        })
    })
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }