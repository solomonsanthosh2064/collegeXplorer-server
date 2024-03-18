const Attendance = require("../modals/attendance")

const createSingleAttendance = async (req, res) => {
    try {
        const { user, status, location, image } = req.body
        const attendance = new Attendance({
            user: user,
            status: status,
            location: location,
            image: image,
        })
        const newAttendance = await attendance.save()
        res.json(newAttendance)
    } catch (error) {
        console.error("Error creating attendance:", error)
        throw error
    }
}

const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate("user")
        res.json(attendance)
    } catch (error) {
        console.error("Error retrieving attendance:", error)
        throw error
    }
}

module.exports = {
    createSingleAttendance,
    getAllAttendance,
}