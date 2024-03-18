const router = require("express").Router()

const {
	createUser,
	getAllUsers,
	getUserById,
	getUserByRegisterNumber,
	updateUser,
	updateClassForUser,
	deleteUser,
	getUserByEmail,
} = require("../controllers/UserController")

// Create a new user
router.post("/user/insert", createUser)

router.post("/user",getUserById)
// Read all users
router.get("/user", getAllUsers)

// Read single users
router.get("/user/id/:id", getUserById)

// Read single users
router.post("/user/login", getUserByEmail)

// Read a user by register number
router.get("/user/registernumber/:registerNumber", getUserByRegisterNumber)

// Update a user by ID
router.put("/user/update/:id", updateUser)

// Update a user for className
router.put("/user/update/classname/:id", updateClassForUser)

// Delete a user by ID
router.delete("/user/delete/:id", deleteUser)

module.exports = router
