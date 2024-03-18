const { createAdminUser, loginAdminUser } = require("../controllers/AdminUserController")

const router = require("express").Router()


// Create a new user
router.post("/adminuser/create", createAdminUser)

// Login a admin user
router.post("/adminuser/login", loginAdminUser)

// // Read all users
// router.get("/adminuser", getAllUsers)

// // Read single users
// router.get("/adminuser/:id", getUserById)

// // Update a user by ID
// router.put("/adminuser/update/:id", updateUser)

// // Delete a user by ID
// router.delete("/adminuser/delete/:id", deleteUser)

module.exports = router
