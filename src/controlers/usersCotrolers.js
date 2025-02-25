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
const { userRoles } = require("../utils/userRols.js");

//get all users
const allUsers = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all users from DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(httpResponse.goodResponse(200, users, "", newToken));
});

//get one user
const oneUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // get user from DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(200, { user }, "", newToken)
    );
});

//create user
const createUser = asyncWrapper(async (req, res) => {
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

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(201, newUser, "user has been saved", newToken)
    );
});

//delete user
const deleteUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if user already exists, if not:
    // return res
    //     .status(400)
    //     .json(httpResponse.badResponse(400, "user not exists"));

    // delete user from DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(200, user, "user deleted", newToken)
    );
});

//edit || update user
const editUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;

    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const newUserData = req.body;

    // check if user already exists, if not:
    // return res
    //     .status(400)
    //     .json(httpResponse.badResponse(400, "user not exists"));

    //  update user data in DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(201, user, "user updated", newToken)
    );
});

module.exports = {
    allUsers,
    deleteUser,
    oneUser,
    editUser,
    createUser,
};
