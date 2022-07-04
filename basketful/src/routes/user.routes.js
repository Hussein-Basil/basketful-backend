const express = require("express")
const router = express.Router()
require('dotenv').config()
const User = require("../models/user")
const validate = require('../models/user')
router.get("/:id?", (req, res) => {
    const callback = (err, doc) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.json(doc)
    }

    if (!req.params.id) {
        User.find({}, callback)
    } else {
        User.findById(req.params.id, callback)
    }
})

router.post("/", (req, res) => {
    //validate user
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user =  User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    /////////

    const { email, password, username, firstName, lastName } = req.body

    user = new User({
        email,
        username,
        firstName,
        lastName,
    })

    user.hashedPassword = user.generateHash(password)

    user.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        req.session.userID = user._id.toString()
        req.session.isAdmin = false
        res.status(200).json({ message: 'User created successfully' })
    })
})



router.put("/:id", (req, res) => {
    const id = req.params.id
    const updates = req.body

    if (req.session && req.session.userID === id || res.session.isAdmin) {
        User.findByIdAndUpdate(id, updates, (err, user) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'User updated successfully' })
        })
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }


})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    if (req.session && req.session.userID === id || res.session.isAdmin) {
        User.findByIdAndRemove(id, (err, user) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'User deleted successfully' })
        })
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

router.post("/add-address", (req, res) => {
    const { city, district, street, postalCode, phone } = req.body

    User.findById(req.session.userID, (err, user) => {
        if (err) {
            return res.status(500).send(err)
        }

        user.address = {
            city,
            district,
            street,
            postalCode,
            phone,
        }

        user.save((err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json({ message: 'Address added successfully' })
        })
    })
})

router.put("/update-address", (req, res) => {
    const { city, district, street, postalCode, phone } = req.body
    const address = {
        city,
        district,
        street,
        postalCode,
        phone,
    }

    User.findByIdAndUpdate(req.session.userID, { address }, (err) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).json({ message: 'Address added successfully' })
    })

})

router.delete("/delete-address", (req, res) => {
    const address = {
        city: '',
        district: '',
        street: '',
        postalCode: '',
        phone: '',

    }
    User.findByIdAndUpdate(req.session.userID, { address }, (err) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).json({ message: 'Address deleted successfully' })
    })
})

router.post("/add-payment", (req, res) => {
    const { method, provider, accountNo, cvv, expiryDate } = req.body
    User.findById(req.session.userID, (err, user) => {
        if (err) {
            return res.status(500).send(err)
        }

        user.payment.push({
            method,
            provider,
            accountNo,
            cvv,
            expiryDate,
        })

        user.save((err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json({ message: 'Payment added successfully' })
        })
    })
})

module.exports = router
