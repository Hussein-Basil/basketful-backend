const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/login', (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (!user) {
            return res.status(401).json({ message: 'email is not assigned to user' })
        }

        if (!user.validPassword(password)) {
            return res.status(401).json({ message: 'password is incorrect' })
        }

        req.session.userID = user._id
        req.session.isAdmin = user.role === 'admin'

        res.status(200).json({ message: 'logged in successfully' })
    })
})

router.delete('/logout', (req, res) => {
    if (req.session) {
        res.session.destroy()
        res.clearCookie('sid')
        res.status(200).json({ message: 'logout succeed' })
    } else {
        res.status(200).json({ message: 'no user to log out' })
    }
})

module.exports = router