//modules
const bcrypt = require("bcryptjs");
//models
const { User } = require("../models/User");
const { ServiceProvider } = require("../models/ServiceProvider");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/generateJWT");
const { userRoles } = require("../utils/userRols");

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
    ) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid Data"));
    }

    let user = null;

    if (role === userRoles.USER) {
        user = await User.findOne({
            phone_No: phone_No,
        });
    } else if (role === userRoles.PROVIDER) {
        user = await ServiceProvider.findOne({
            phone_No: phone_No,
        });
    } else {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid Data"));
    }

    if (user !== null) {
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
            "user has been created"
        )
    );
});

//login
const login = asyncWrapper(async (req, res) => {
    const { phone_No, role } = req.body;

    if (!phone_No || !role) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "phone number is required"));
    }

    let user = null;

    if (role === userRoles.USER) {
        user = await User.findOne({
            phone_No: phone_No,
        });
    } else if (role === userRoles.PROVIDER) {
        user = await ServiceProvider.findOne({
            phone_No: phone_No,
        });
    } else {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid Data"));
    }

    if (user === null) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user not exists"));
    }

    const accessToken = await generateAccessToken({
        phone_No: user.phone_No,
        national_No: user.National_No,
        role: user.role,
    });

    const refreshToken = await generateRefreshToken({
        phone_No: user.phone_No,
        national_No: user.National_No,
        role: user.role,
    });

    await user.update({
        accessToken,
        refreshToken,
    });

    res.status(200).json(
        httpResponse.goodResponse(201, user, "user logged in successfully")
    );
});

module.exports = {
    register,
    login,
};
