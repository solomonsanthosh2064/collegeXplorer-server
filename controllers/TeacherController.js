const bcrypt = require("bcrypt")
const Teacher = require("../modals/teacher")
const User = require("../modals/user")

const createTeacher = async (req, res) => {
	try {
		const { name, email, password, confirmPassword, className } = req.body
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" })
		}
        const hashedPassword = await bcrypt.hash(password, 10)
		const newTeacher = await Teacher.create({
			name: name,
			email: email,
			password: hashedPassword,
			imageTeacher : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
			className: className
		})
        const savedTeacher = await newTeacher.save()
		res.json(newTeacher)
	} catch (error) {
		console.error("Error creating teacher:", error)
		throw error
	}
}

const getAllTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find()
		res.json(teachers)
	} catch (error) {
		console.error("Error retrieving teachers:", error)
		throw error
	}
}

const loginTeacherUser = async (req, res) => {
	const { emailLogin, passwordLogin } = req.body

	try {
		const teacher = await Teacher.findOne({ email: emailLogin })

		if (
			!teacher ||
			!(await bcrypt.compare(passwordLogin, teacher.password))
		) {
			return res.status(401).json({ error: "Invalid email or password" })
		}

		// Return token and shop details to the client
		res.json(teacher)
	} catch (error) {
		console.error("Login error:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const getAllStudentsByTeacherId = async (req, res) => {
	try {
		const teacherId = req.params.id
		const teacher = await Teacher.findById(teacherId)
		const students = await User.find({ className: teacher.className })
		res.json(students)
	} catch (error) {
		console.error("Error retrieving students by teacher ID:", error)
		throw error
	}
}

const updateTeacher = async (req, res) => {
	try {
		const teacherId = req.params.id
		const { name, email } = req.body
		const teacher = await Teacher.findById(teacherId)

		teacher.name = name
		teacher.email = email

		const updatedTeacher = await teacher.save()
		res.json(updatedTeacher)
	} catch (error) {
		console.error("Error updating teacher:", error)
		throw error
	}
}

module.exports = {
	createTeacher,
	getAllTeachers,
	loginTeacherUser,
	getAllStudentsByTeacherId,
	updateTeacher
}
