const Store = require("../models/store");
const User = require("../models/user");

async function injectStores () {

  const { _id: ownerID } = await User.findOne({ role: "admin" });

  const stores = await Store.find({ ownerID })

  if (stores.length == 0) {
    const newStores = [
      {
        ownerID,
        username: "gigabyte",
        name: "Gigabyte Store",
        description: "Shop 1 description",
        logo: "Shop 1 image",
        address: {
            city: "Shop 1 city",
            district: "Shop 1 address",
            phone: "Shop 1 phone",
        },
        website: "Shop 1 website",
      },
      {
        ownerID,
        username: "digital",
        name: "Digital Store",
        description: "Shop 2 description",
        logo: "Shop 2 image",
        address: {
            city: "Shop 2 city",
            district: "Shop 2 address",
            phone: "Shop 2 phone",
        },
        website: "Shop 2 website",
      },
    ];
    
    await Store.insertMany(newStores);
  }
}

module.exports = injectStores