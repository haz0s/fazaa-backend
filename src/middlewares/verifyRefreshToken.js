const jwt = require("jsonwebtoken");
const httpResponse = require("../utils/httpRespone");
const { generateAccessToken } = require("../utils/generateJWT");

const verifyRefreshToken = async (req, res, next) => {
    if (req.currentUser === "Unauthorized") {
        const refreshToken = req.headers.refreshtoken;

        if (!refreshToken) {
            return res
                .status(401)
                .json(httpResponse.badResponse(401, "Unauthorized"));
        }

        try {
            let currentUser = jwt.verify(
                refreshToken,
                process.env.jwt_secret_refresh_key
            );

            const newAccessToken = await generateAccessToken({
                email: currentUser.email,
                id: currentUser._id,
                role: currentUser.role,
            });

            currentUser.newAccessToken = newAccessToken;

            // set new access token to user db

            req.currentUser = currentUser;

            next();
        } catch (err) {
            return res
                .status(401)
                .json(httpResponse.badResponse(401, "Unauthorized"));
        }
    } else {
        next();
    }
};

module.exports = verifyRefreshToken;
