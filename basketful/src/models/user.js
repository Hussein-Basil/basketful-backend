const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt = require("bcrypt")
const Joi = require("joi")

const User = new mongoose.Schema({
	email: { type: String, require: true, unique: true },
	verifiedEmail: { type: Boolean, default: false },
	hashedPassword: { type: String, require: true },
	username: { type: String, require: true, unique: true },
	firstName: { type: String, require: true },
	lastName: { type: String, require: true },
	address: {
		city: String,
		district: String,
		street: String,
		postalCode: String,
		phone: String,
	},
	payment: [{
		method: String,
		provider: String,
		account_no: String,
		cvv: String,
		expiryDate: String,
	}],
	cart: [{
		productId: { type: mongoose.Types.ObjectId, ref: 'product', require: true },
		quantity: { type: Number, min: 1, default: 1, require: true },
	}],
	wishlist: [{
		productId: { type: mongoose.Types.ObjectId, ref: 'product', require: true },
		adddedAt: { type: Date, default: Date.now, require: true },
	}],
	role: { type: String, require: true, default: 'user' },
}, {
	timestamps: true
})


User.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
User.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword)
}

//validation function
function validateUser(user) {
	const schema = {
    firstName: Joi.string()
		.min(1)
		.max(50)
        .required(),
	lastName: Joi.string()
		.min(1)
		.max(50)
        .required(),
	username: Joi.string()
		.min(3)
		.max(30)
		.required()
		.alphanum(),
    email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
    password: Joi.string()
        .min(5)
        .max(255)
        .required()
};

return Joi.validate(user, schema)
}

module.exports = mongoose.model('user', User)
module.exports.validate = validateUser;
