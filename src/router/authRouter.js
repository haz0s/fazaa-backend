//modules
const express = require("express");
const multer = require("multer");
//controlers
const AuthControlers = require("../controlers/authControlers.js");
//middlewares
const { verifyEmail } = require("../middlewares/verifyEmail.js");
//utils
const AppError = require("../utils/appError.js");

//recieve images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/users");
    },
    filename: function (req, file, cb) {
        let userEmail = req.body.email;

        const ext = file.mimetype.split("/")[1];
        const fileName = `user-${userEmail}-${Date.now()}.${ext}`;
        cb(null, fileName);
    },
});

const fileFilter = function (req, file, cb) {
    const imageType = file.mimetype.split("/")[0];
    if (imageType == "image") {
        return cb(null, true);
    } else {
        const error = AppError.create("file must be an image", 400);
        return cb(error, false);
    }
};

const upload = multer({ storage: diskStorage, fileFilter });

//routes
const router = express.Router();

// router
//     .route("/register")
//     .post(verifyEmail, upload.single("ID"), AuthControlers.register);

router.route("/register").post(AuthControlers.register);

router.route("/login").post(AuthControlers.login);

module.exports = router;
