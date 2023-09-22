const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const storeRotuer = require("./routes/store.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");
const categoryRouter = require("./routes/category.routes");
const discountRouter = require("./routes/discount.routes");
const adminRouter = require("./routes/admin.routes");

const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 8000;

// const sendEmail = require("./helpers/sendEmail");

const main = async () => {
  require("dotenv").config();

  const app = express();

  app.use(logger); // custom middleware logger

  // handle options credentials check - before CORS!
  // and fetch cookies credentials requirement
  app.use(credentials);

  app.use(cors(corsOptions)); // Cross Origin Resource Sharing

  app.use(express.json()); // bulit-in middleware for json

  app.use(cookieParser()); // middleware fo cookies

  // connecting to database
  mongoose.connect("mongodb+srv://timjab:green@cluster0.dhuwbuj.mongodb.net/basketful?retryWrites=true&w=majority");

  // routes
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/store", storeRotuer);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/discount", discountRouter);

  app.use("/admin", adminRouter);

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log("[LISTENING] app is listening on port", PORT, "@", time);
  });
};

main().catch(console.error);
