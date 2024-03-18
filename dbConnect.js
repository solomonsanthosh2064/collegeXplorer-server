const mongoose = require("mongoose")

const dbConnect = () => {
	mongoose.connect(process.env.DB)

	mongoose.connection.on("connected", () => {
		console.log("MongoDB is connect successfully")
	})
	mongoose.connection.on("error", (err) => {
		console.log("MongoDB has an error", err)
	})
	mongoose.connection.on("disconnected", () => {
		console.log("MongoDB is disconnected")
	})
}

module.exports = dbConnect
