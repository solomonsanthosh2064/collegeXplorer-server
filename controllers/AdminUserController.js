const bcrypt = require("bcrypt")
const Shop = require("../modals/shop")
const AdminUser = require("../modals/adminUser")

const createAdminUser = async (req, res) => {
	try {
		const {
			adminConfirmPassword,
			adminEmail,
			adminName,
			adminPassword,
			shopDescription,
			shopImage,
			shopLoc,
			shopName,
			shopType,
		} = req.body

		// "adminConfirmPassword": "123123",
		//  "adminEmail": "hello@gmail.com",
		//   "adminName": "Hello",
		//    "adminPassword": "123123",
		//     "shopDescription": "Hello Description",
		//      "shopImage": "https://s3-media0.fl.yelpcdn.com/bphoto/PESG1xAD2jhXMGe5-QiEIg/1000s.jpg",
		//       "shopLoc": "location",
		//        "shopName": "Hello",
		//         "shopType": "stationery"

		if(adminConfirmPassword !== adminPassword) {
			return res.status(400).json({ error: "Passwords do not match" })
		}
		// Hash the password
		const hashedPassword = await bcrypt.hash(adminPassword, 10)

		// Create a new shop
		const newShop = new Shop({
			name: shopName,
			description: shopDescription,
			loc: shopLoc,
			shopImage: shopImage,
			type: shopType,
		})
		const savedShop = await newShop.save()

		// Create a new admin user with the hashed password and the shopId
		const newAdminUser = new AdminUser({
			adminName,
			adminEmail,
			adminPassword: hashedPassword,
			shopId: savedShop._id, // Associate admin user with the created shop
		})
		const savedAdminUser = await newAdminUser.save()

		res.status(201).json({
			message: "Admin user and shop created successfully",
		})
	} catch (error) {
		console.error("Error creating admin user and shop:", error)
		res.status(500).json({ error: "Failed to create admin user and shop" })
	}
}

const loginAdminUser = async (req, res) => {
	const { emailLogin, passwordLogin } = req.body

	try {
		const user = await AdminUser.findOne({ adminEmail: emailLogin })

		if (
			!user ||
			!(await bcrypt.compare(passwordLogin, user.adminPassword))
		) {
			return res.status(401).json({ error: "Invalid email or password" })
		}

		// Get shop details
		const shop = await Shop.findById(user.shopId).populate("products")

		// Generate JWT token
		// const token = jwt.sign({ userId: user._id }, "your_secret_key", {
		// 	expiresIn: "1h",
		// })

		// Return token and shop details to the client
		res.json(shop)
	} catch (error) {
		console.error("Login error:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

module.exports = {
	createAdminUser,
	loginAdminUser,
}
