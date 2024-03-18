const router = require("express").Router()

const {
	createOrder,
	getAllOrders,
	getAllOrdersForShop,
	getAllOrdersForUser,
	updateOrder,
	deleteOrder,
} = require("../controllers/OrderController")

// Create a new order
router.post("/order/insert", createOrder)

// Read all orders
router.get("/order", getAllOrders)

// Read all orders for shop
router.get("/order/:shopId", getAllOrdersForShop)

router.get("/order/user/:userId", getAllOrdersForUser)


// Update a order by ID
router.put("/order/update/:id", updateOrder)

// Delete a order by ID
router.delete("/order/delete/:id", deleteOrder)

module.exports = router
