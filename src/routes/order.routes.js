const express = require("express")
const router = express.Router()

const Order = require("../models/order")

router.get("/:id?", (req, res) => {
    if (req.params.id) {
        Order.findById(req.params.id, (err, order) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(order)
        })
    } else {
        Order.find({}, (err, orders) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(orders)
        })
    }
})

router.post("/:id", (req, res) => {
    const {
        userID,
        storeID,
        products,
        totalPrice,
        status
    } = req.body

    const order = new Order({
        userID,
        storeID,
        products,
        totalPrice,
        status
    })

    order.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Order created successfully' })
    })
})

module.exports = router