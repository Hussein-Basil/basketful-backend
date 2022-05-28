const express = require("express")
const router = express.Router()
require('dotenv').config()

const Store = require("../models/store")

router.get("/:id?", (req, res) => {
    const callback = (err, doc) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.json(doc)
    }

    if (!req.params.id) {
        Store.find({}, callback)
    } else {
        Store.findById(req.params.id, callback)
    }
})

router.post("/", (req, res) => {
    const { adminId, storeId, name, logo } = req.body

    const store = new Store({
        adminId,
        storeId,
        name,
        logo
    })

    store.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Store created successfully' })
    })
})

router.put("/:id", (req, res) => { // isSelf
    const id = req.params.id
    const updates = req.body

    Store.findByID(id, (err, store) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (req.session.isAdmin || store.ownerID.toString() === req.session.userID) {
            store.findByIdAndUpdate(updates, (err) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.json({ message: 'Store updated successfully' })
            })
        } else {
            res.json({ message: 'Unauthorized' })
        }
    })

})

router.delete("/:id", (req, res) => { // isSelf
    const id = req.params.id

    Store.findByID(id, (err, store) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (req.session.isAdmin || store.ownerID.toString() === req.session.userID) {
            store.remove((err) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.json({ message: 'Store deleted successfully' })
            })
        } else {
            res.json({ message: 'Unauthorized' })
        }
    })
})

module.exports = router
