//modules
const bcrypt = require("bcryptjs");
//models

//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/generateJWT");
const userRoles = require("../utils/userRols");

//register
const register = asyncWrapper(async (req, res) => {
    const {
        firstName,
        lastName,
        gender,
        location,
        National_No,
        phone_No,
        role,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !gender ||
        !location ||
        !National_No ||
        !phone_No ||
        !role
        // req.file === undefined
    ) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user already exists"));
    }

    // let identity = req.file.filename;

    // check if user already exists, if so:
    // return res
    //     .status(400)
    //     .json(httpResponse.badResponse(400, "user already exists"));

    const hashedNational_No = await bcrypt.hash(National_No, 10);
    const hashedPhone_No = await bcrypt.hash(National_No, 10);

    const accessToken = await generateAccessToken({
        phone_No: newUser.phone_No,
        id: newUser.id,
        role: newUser.role,
    });

    const refreshToken = await generateRefreshToken({
        phone_No: newUser.phone_No,
        id: newUser.id,
        role: newUser.role,
    });

    // save user to DB

    res.status(201).json(
        httpResponse.goodResponse(201, newUser, "user has been saved")
    );
});

//login
const login = asyncWrapper(async (req, res) => {
    const { phone_No } = req.body;

    if (!phone_No) {
        return res
            .status(400)
            .json(
                httpResponse.badResponse(400, "email and password are required")
            );
    }

    // check if user exists, if not:

    // return res
    //     .status(400)
    //     .json(httpResponse.badResponse(400, "user not exists"));

    // check phone number matches
    const matchedPhone_No = await bcrypt.compare(password, oldUser.password);
    if (!matchedPhone_No) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "password mismatch"));
    }

    const accessToken = await generateAccessToken({
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
    });

    const refreshToken = await generateRefreshToken({
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
    });

    // put tokens to user DB

    res.status(200).json(
        httpResponse.goodResponse(201, oldUser, "user logged in successfully")
    );
});

module.exports = {
    register,
    login,
};
