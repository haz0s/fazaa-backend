//modules
const express = require("express");
//controlers
const userControlers = require("../controlers/usersCotrolers");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const { verifyEmail } = require("../middlewares/verifyEmail.js");
//utils
const allowedTo = require("../middlewares/allowedTo.js");
const { userRoles } = require("../utils/userRols.js");

//routes
const router = express.Router();

router
    .route("/")
    .get(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN),
        userControlers.allUsers
    )
    .post(
        verifyToken,
        verifyRefreshToken,
        verifyEmail,
        allowedTo(userRoles.ADMN),
        userControlers.createUser
    );

router
    .route("/:id")
    .get(verifyToken, verifyRefreshToken, userControlers.oneUser)
    .patch(verifyToken, verifyRefreshToken, userControlers.editUser)
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN),
        userControlers.deleteUser
    );

module.exports = router;
