const router = require("express").Router()

const {
	createShop,
	getAllShops,
	getShopById,
	updateShop,
	deleteShop,
} = require("../controllers/ShopController")

// Create a new shop
router.post("/shop/insert", createShop)

// Read all shops
router.get("/shop", getAllShops)

// Read shop by id
router.get("/shop/:id", getShopById)

// Update a shop by ID
router.put("/shop/update/:id", updateShop)

// Delete a shop by ID
router.delete("/shop/delete/:id", deleteShop)

module.exports = router
