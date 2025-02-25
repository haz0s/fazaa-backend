//modules
const express = require("express");
//controlers
const servicesControlers = require("../controlers/servicesControlers");
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
    .get(servicesControlers.allServices)
    .post(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.PROVIDER),
        servicesControlers.createService
    );

router
    .route("/:id")
    .get(servicesControlers.oneService)
    .patch(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.PROVIDER),
        servicesControlers.editService
    )
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.PROVIDER),
        servicesControlers.deleteService
    );

module.exports = router;
