const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	status: { type: Boolean, default: false },
	location: { type: Boolean, default: false },
	image: { type: String, default: null },
	dateTime : { type : Date, default: Date.now }
})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance
