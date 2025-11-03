const express = require("express")
const adminLogin = require("../controllers/adminControllers")

const adminRouter = express.Router()

//login route for admin
adminRouter.post("/login", adminLogin)

module.exports = adminRouter