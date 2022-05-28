const express = require("express")
const router = express.Router()
require('dotenv').config()

const Product = require("../models/product")

router.get("/:id?", (req, res) => {
    if (req.params.id) {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(product)
        })
    } else {
        Product.find({}, (err, products) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(products)
        })
    }
})

router.post("/:id", (req, res) => {
    const {
        name,
        description,
        storeID,
        categoryID,
        price,
        image,
        stockQuantity,
        discountID
    } = req.body

    const product = new Product({
        name,
        description,
        storeID,
        categoryID,
        price,
        image,
        stockQuantity,
        discountID
    })

    product.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Product created successfully' })
    })
})

module.exports = router
