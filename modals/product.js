const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
	productName: { type: String, required: true },
	shop: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Shop",
		required: true,
	},
	productDescription: { type: String },
	productType: { type: String, required: true },
	productImage: { type: String },
	productPrice: { type: Number, required: true },
	isProductAvailable: { type: Boolean, default: true },
})
const Product = mongoose.model("Product", productSchema)

module.exports = Product
