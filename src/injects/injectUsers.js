const User = require("../models/user");

async function injectUsers() {
  await User.findOneAndUpdate(
    { username: "admin" },
    {
      username: "admin",
      email: "admin@gmail.com",
      verifiedEmail: true,
      firstName: "Hussein",
      lastName: "Basil",
      address: {
        city: "Basra",
        district: "Abu Al-Khaseeb",
        street: "Hamdan",
        postalCode: "61009",
        phone: "+9647819783682",
      },
      role: "admin",
      hashedPassword: new User().generateHash("admin"),
    }
  );
}

module.exports = injectUsers;
