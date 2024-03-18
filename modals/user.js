const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	registerNumber : { type: String, required: true, unique: true },
	userImage : { type: String, default:"https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" },
	className : { type: String, default:"" },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	orders: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Order", default: [] },
	],
})

const User = mongoose.model("User", userSchema)

module.exports = User
