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

const getAllAttendanceForSingleClassName = async (req, res) => {
    try {
        const className = req.params.classname.toUpperCase();
        
        // Get the current date and time
        const currentDate = new Date();
        
        // Construct the start of the day (8:00 AM) for today
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(8, 0, 0, 0);
        
        // Construct the end of the day (11:59:59 PM) for today
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const attendance = await Attendance.find({
            dateTime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
        .populate({
            path: 'user',
            match: { className: className }
        })
        .exec();

        console.log(attendance, "attendance");

        const filteredAttendance = attendance.filter(record => {
            return record.user !== null && record.user !== undefined;
        });

        const updatedAttendance = filteredAttendance.map(record => {
            const recordTime = new Date(record.dateTime);
            
            // Check if the recorded time is after the start of the day (8:00 AM)
            const isLate = recordTime > startOfDay;

            // Assign status based on whether the student is late or not
            const status = isLate ? "Late" : "On Time";

            return {
                ...record.toObject(),
                calculatedStatus: status
            };
        });

        res.json(updatedAttendance);
    } catch (error) {
        console.error("Error retrieving attendance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};





module.exports = {
	createSingleAttendance,
	getAllAttendance,
	getAllAttendanceForSingleClassName,
}