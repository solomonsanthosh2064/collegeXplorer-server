const {
	createTeacher,
	getAllTeachers,
	loginTeacherUser,
	getAllStudentsByTeacherId,
	updateTeacher
} = require("../controllers/TeacherController")

const router = require("express").Router()

router.get("/teacher", getAllTeachers)
router.get("/teacher/students/:id", getAllStudentsByTeacherId)
router.post("/teacher/insert", createTeacher)
router.post("/teacher/login", loginTeacherUser)
router.put("/teacher/update/:id", updateTeacher)


module.exports = router
