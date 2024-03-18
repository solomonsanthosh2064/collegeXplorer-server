const { getNotesByTeacherId, createNotes } = require("../controllers/NotesController")

const router = require("express").Router()

router.get("/notes/teacher/:teacherId", getNotesByTeacherId)

router.post("/notes/teacher/create", createNotes)

module.exports = router;