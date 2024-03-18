const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	loc: { type: String },
	shopImage : { type: String },
	shopType : { type: String },
	products: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Product", 
		default: [] 
	}],
	isOpened: { type: Boolean, default: true },
	type: { type: String, required: true },
})

const Shop = mongoose.model("Shop", shopSchema)

module.exports = Shop
