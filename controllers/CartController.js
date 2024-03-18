const Cart = require("../modals/cart")

// Create a new cart
const createCart = async (req, res) => {
	try {
		const { user, items } = req.body
		const newCart = new Cart({
			user: user,
			items: items.map((item) => ({
				product: item.productId,
				quantity: item.quantity,
			})),
		})

		const savedCart = await newCart.save()
		// console.log("Cart created:", savedCart)
		res.json(savedCart)
	} catch (error) {
		console.error("Error creating cart:", error)
		throw error
	}
}

// Read all carts
const getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find().populate("user").populate("items.product")
		// console.log("All carts:", carts)
		res.json(carts)
	} catch (error) {
		console.error("Error retrieving carts:", error)
	}
}

// Update a cart by ID
const updateCart = async (req, res) => {
	try {
		const id = req.params.id
		const { user, items } = req.body
		const updatedCart = await Cart.findByIdAndUpdate(
			id,
			{
				user: user,
				items: items.map((item) => ({
					product: item.productId,
					quantity: item.quantity,
				})),
			},
			{ new: true }
		)

		// console.log("Updated cart:", updatedCart)
		res.json(updatedCart)
	} catch (error) {
		console.error("Error updating cart:", error)
		throw error
	}
}

// Delete a cart by ID
const deleteCart = async (req, res) => {
	try {
		const id = req.params.id
		const deletedCart = await Cart.findByIdAndDelete(id)
		// console.log("Deleted cart:", deletedCart)
		res.json(deletedCart)
	} catch (error) {
		console.error("Error deleting cart:", error)
		throw error
	}
}

module.exports = {
	createCart,
	getAllCarts,
	updateCart,
	deleteCart,
}
