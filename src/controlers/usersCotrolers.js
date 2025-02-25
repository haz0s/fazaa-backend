//modules
const bcrypt = require("bcryptjs");
//models
const { User } = require("../models/User");
const { ServiceProvider } = require("../models/ServiceProvider");
const { Person } = require("../models/Person");
const {
    ServiceProviderServices,
} = require("../models/ServiceProvider_Services.js");
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

    const users = await Person.findAll({
        limit,
        offset,
    });

    // return the new access token
    let newToken = req.currentUser?.newAccessToken || null;

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

    const user = await Person.findByPk(userID);

    // return the new access token
    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(httpResponse.goodResponse(200, user, "", newToken));
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
    ) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user already exists"));
    }

    const user = await Person.findOne({ phone_No: phone_No });

    if (user) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user already exists"));
    }

    const hashedNational_No = await bcrypt.hash(National_No, 10);

    const accessToken = await generateAccessToken({
        phone_No: phone_No,
        national_No: National_No,
        role: role,
    });

    const refreshToken = await generateRefreshToken({
        phone_No: phone_No,
        national_No: National_No,
        role: role,
    });

    if (role === userRoles.USER) {
        await User.create({
            firstName,
            lastName,
            gender,
            location,
            nationalNo: hashedNational_No,
            cachedAvgRating: null,
            numOfRating: 0,
            accessToken,
            refreshToken,
        });
    } else if (role === userRoles.PROVIDER) {
        await ServiceProvider.create({
            firstName,
            lastName,
            gender,
            location,
            nationalNo: hashedNational_No,
            accessToken,
            refreshToken,
        });
    }

    // return the new access token
    let newToken = req.currentUser?.newAccessToken || null;

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            {
                firstName,
                lastName,
                gender,
                location,
                nationalNo: hashedNational_No,
                accessToken,
                refreshToken,
            },
            "user has been created",
            newToken
        )
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

    const user = await Person.findOne({ phone_No: phone_No });

    if (!user) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user not exists"));
    }

    await user.destroy();

    // return the new access token
    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(
        httpResponse.goodResponse(200, user, "user deleted", newToken)
    );
});

//edit || update user
const editUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    const newUserData = req.body;

    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const user = await Person.findOne({ phone_No: phone_No });

    if (!user) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user not exists"));
    }

    if (newUserData.nationalNo) {
        newUserData.nationalNo = await bcrypt.hash(newUserData.nationalNo, 10);
    }

    await user.update(newUserData);

    // return the new access token
    let newToken = req.currentUser?.newAccessToken || null;

    res.status(201).json(
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
