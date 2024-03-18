const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, default: 1 },
		},
	],
	shopId : { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
	isOrderComplete: { type: Boolean, default: false },
	status: { type: String, default: "pending"},
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
