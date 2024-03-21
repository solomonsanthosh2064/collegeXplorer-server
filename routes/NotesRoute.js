const {
	getNotesByTeacherId,
	createNotes,
	deleteNotes,
	getNotesByClass,
} = require("../controllers/NotesController")

const router = require("express").Router()

router.get("/notes/teacher/:teacherId", getNotesByTeacherId)

router.post("/notes/teacher/create", createNotes)

router.delete("/notes/teacher/:notesId", deleteNotes)

router.get("/notes/:class", getNotesByClass)

module.exports = router