const router = require("express").Router()

const {
	createCart,
	getAllCarts,
	updateCart,
	deleteCart,
} = require("../controllers/CartController")

// Create a new cart
router.post("/cart/insert", createCart)

// Read all carts
router.get("/cart", getAllCarts)

// Update a cart by ID
router.put("/cart/update/:id", updateCart)

// Delete a cart by ID
router.delete("/cart/delete/:id", deleteCart)

module.exports = router
