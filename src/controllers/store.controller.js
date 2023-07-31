const Store = require("../models/store");

const handleGetAllStores = (req, res) => {
  Store.find({}, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(doc);
  });
};

const handleGetStoreById = (req, res) => {
  Store.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(doc);
  });
};

const handleCreateStore = (req, res) => {
  const { adminId, storeId, name, logo } = req.body;

  const store = new Store({
    adminId,
    storeId,
    name,
    logo,
  });

  store.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Store created successfully" });
  });
};

const handleUpdateStore = (req, res) => {
  // isSelf
  const id = req.params.id;
  const updates = req.body;

  Store.findByID(id, (err, store) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (
      req.session.isAdmin ||
      store.ownerID.toString() === req.session.userID
    ) {
      store.findByIdAndUpdate(updates, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ message: "Store updated successfully" });
      });
    } else {
      res.json({ message: "Unauthorized" });
    }
  });
};

const handleDeleteStore = (req, res) => {
  // isSelf
  const id = req.params.id;

  Store.findByID(id, (err, store) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (
      req.session.isAdmin ||
      store.ownerID.toString() === req.session.userID
    ) {
      store.remove((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ message: "Store deleted successfully" });
      });
    } else {
      res.json({ message: "Unauthorized" });
    }
  });
};

module.exports = { handleGetAllStores, handleGetStoreById, handleCreateStore, handleUpdateStore, handleDeleteStore};
