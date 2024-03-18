const router = require("express").Router()

const {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductsByShopId,
	getProductById
} = require("../controllers/ProductController")

// Create a new product
router.post("/product/insert", createProduct)

// Read all products
router.get("/product", getAllProducts)

// Read product by id
router.get("/product/:id", getProductById)

// Read all products by shop id
router.get("/product/shop/:id", getProductsByShopId)

// Update a product by ID
router.put("/product/update/:id", updateProduct)

// Delete a product by ID
router.delete("/product/delete/:id", deleteProduct)

module.exports = router
