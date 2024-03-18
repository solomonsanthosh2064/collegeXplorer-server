const Notes = require("../modals/notes")

const getNotesByTeacherId = async (req, res) => {
	try {
        let teacherId = req.params.teacherId
		const notes = await Notes.find({
			teacherId: teacherId,
		}).populate("teacherId")
		res.json(notes)
	} catch (error) {
		console.error("Error retrieving notes:", error)
		throw error
	}
}

const createNotes = async (req, res) => {
	try {
		const { teacherId, title, className, notes } = req.body;
		const newNotes = new Notes({
			teacherId: teacherId,
			title : title,
			className : className,
			notes: notes,
		})
		await newNotes.save()
		res.json(newNotes)
	} catch (error) {
		console.error("Error creating notes:", error)
		throw error
	}
}

module.exports = {
    getNotesByTeacherId,
	createNotes
}