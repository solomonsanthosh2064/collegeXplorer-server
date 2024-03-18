const { createSingleAttendance, getAllAttendance } = require("../controllers/AttendanceController")

const router = require("express").Router()

router.get("/attendance", getAllAttendance)
router.post("/attendance/insert", createSingleAttendance)

module.exports = router
