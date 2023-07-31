const Product = require("../models/product");

const handleGetAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(products);
  });
};

const handleGetProductById = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(product);
  });
};

const handleCreateProduct = (req, res) => {
  const {
    name,
    description,
    storeID,
    categoryID,
    price,
    image,
    stockQuantity,
    discountID,
  } = req.body;

  const product = new Product({
    name,
    description,
    storeID,
    categoryID,
    price,
    image,
    stockQuantity,
    discountID,
  });

  product.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Product created successfully" });
  });
};

module.exports = {
  handleGetAllProducts,
  handleGetProductById,
  handleCreateProduct,
};
