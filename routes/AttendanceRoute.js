const { createSingleAttendance, getAllAttendance, getAllAttendanceForSingleClassName } = require("../controllers/AttendanceController")

const router = require("express").Router()

router.get("/attendance", getAllAttendance)
router.get("/attendance/class/:classname", getAllAttendanceForSingleClassName)
router.post("/attendance/insert", createSingleAttendance)

module.exports = router