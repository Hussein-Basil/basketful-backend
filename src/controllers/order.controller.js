const Order = require("../models/order");

const handleGetAllOrders = (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(orders);
  });
};

const handleGetOrderById = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(order);
  });
};

const handleCreateOrder = (req, res) => {
  const { userID, storeID, products, totalPrice, status } = req.body;

  const order = new Order({
    userID,
    storeID,
    products,
    totalPrice,
    status,
  });

  order.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Order created successfully" });
  });
};

const handleDeleteOrder = (req, res) => {
  return res.send("Order deletion is not implemented yet :(");
};

module.exports = {
  handleGetAllOrders,
  handleGetOrderById,
  handleCreateOrder,
  handleDeleteOrder,
};
