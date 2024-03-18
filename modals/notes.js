const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
	teacherId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teacher",
		required: true,
	},
	title: { type: String, required: true },
	className: { type: String, required: true },
	notes: { type: String, required: true },
})

const Notes = mongoose.model("Notes", notesSchema)

module.exports = Notes
