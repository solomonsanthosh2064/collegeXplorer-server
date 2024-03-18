const mongoose = require("mongoose")

const adminUserSchema = new mongoose.Schema({
	adminName: { type: String, required: true },
	adminEmail: { type: String, required: true, unique: true },
	adminPassword: { type: String, required: true },
	shopId : { type: mongoose.Schema.Types.ObjectId, ref: "Shop"},
})

const AdminUser = mongoose.model("AdminUser", adminUserSchema)

module.exports = AdminUser
