//modules
const express = require("express");
//controlers
const reportsControlers = require("../controlers/reportsControlers");
//utils
const { userRoles } = require("../utils/userRols");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const allowedTo = require("../middlewares/allowedTo");

//routes
const router = express.Router();

router
    .route("/")
    .get(reportsControlers.allReports)
    .post(verifyToken, verifyRefreshToken, reportsControlers.createReport);

router
    .route("/:id")
    .get(reportsControlers.oneReport)
    .patch(verifyToken, verifyRefreshToken, reportsControlers.editReport)
    .delete(verifyToken, verifyRefreshToken, reportsControlers.deleteReport);

module.exports = router;
