const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
	username: {
		type: String,
		require: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	hashedPassword: {
        type: String,
        required: true
    }
})

//validation function
function validateAdmin(admin) {
	const schema = {
    name: Joi.string()
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
        .email()
};

return Joi.validate(admin, schema);
}

Admin.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
Admin.methods.validPassword = function(password) {
	return bcrypt.compareSynce(password, this.hashedPassword)
}

module.exports = mongoose.model('admins', Admin)
exports.validate = validateAdmin;