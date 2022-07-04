const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const cors = require("cors")

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const storeRotuer = require('./routes/store.routes')
const productRouter = require('./routes/product.routes')
const orderRouter = require('./routes/order.routes')
const categoryRouter = require('./routes/category.routes')
const discountRouter = require('./routes/discount.routes')

const sendEmail = require('./helpers/sendEmail')

const main = async () => {
    require("dotenv").config()
    const app = express()

    app.use(express.json())
    app.use(session({
        name: 'sid',
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 60 * 60 * 24 * 7,
        }
    }))
    app.use(cors({ credentials: true, origin: 'http://localhost:8000' }))

    mongoose.connect("mongodb://localhost:27017/ratemyprofessor")

    app.use("/api/auth", authRouter)
    app.use("/api/user", userRouter)
    app.use("/api/store", storeRotuer)
    app.use("/api/product", productRouter)
    app.use("/api/order", orderRouter)
    app.use("/api/category", categoryRouter)
    app.use("/api/discount", discountRouter)

    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    app.listen(process.env.PORT || 8000, () => {
        console.log('[LISTENING] app is listening on port', process.env.PORT || 8000, '@', time)
    })
}

main().catch(err => {
    console.error(err)
})