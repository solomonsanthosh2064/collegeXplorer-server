require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const dbConnect = require("./dbConnect")
// routers
const ShopRouter = require("./routes/ShopRoute")
const ProductRouter = require("./routes/ProductRoute")
const OrderRouter = require("./routes/OrderRoute")
const UserRouter = require("./routes/UserRoute")
const CartRouter = require("./routes/CartRoute")
const AdminUserRoute = require("./routes/AdminUserRoute")
const TeacherRouter = require("./routes/TeacherRoute")
const AttendanceRouter = require("./routes/AttendanceRoute")
const NotesRouter = require("./routes/NotesRoute")

const morgan = require("morgan")

dbConnect()
app.use(express.json())
app.use(cors())
app.use(morgan())

app.get("/api", (req, res) => {
	res.send("Hello World")
})

// Restaurant
app.use("/api", ShopRouter)
// Product
app.use("/api", ProductRouter)
// Order
app.use("/api", OrderRouter)
// User
app.use("/api", UserRouter)
// User
app.use("/api", AdminUserRoute)
// Cart
app.use("/api", CartRouter)
// Teacher
app.use("/api", TeacherRouter)
// Attendance
app.use("/api", AttendanceRouter)
// Notes
app.use("/api", NotesRouter)

app.listen(process.env.PORT, () => {
	console.log(`Server is running in ${process.env.PORT}`)
})
