const jwt = require("jsonwebtoken");
const httpResponse = require("../utils/httpRespone");
const { generateAccessToken } = require("../utils/generateJWT");
const { Person } = require("../models/Person");

const verifyRefreshToken = async (req, res, next) => {
    if (req.currentUser === "Unauthorized") {
        const refreshToken = req.headers.refreshtoken;

        if (!refreshToken) {
            return res
                .status(401)
                .json(httpResponse.badResponse(401, "Unauthorized"));
        }

        const verify = refreshToken.split(" ")[0];
        const token = refreshToken.split(" ")[1];

        if (verify !== "ReBearer") {
            return res
                .status(401)
                .json(httpResponse.badResponse(401, "Unauthorized"));
        }

        try {
            let currentUser = jwt.verify(
                token,
                process.env.jwt_secret_refresh_key
            );

            const newAccessToken = await generateAccessToken({
                email: currentUser.email,
                id: currentUser._id,
                role: currentUser.role,
            });

            currentUser.newAccessToken = newAccessToken;

            await Person.update(
                { accessToken: newAccessToken },
                {
                    where: {
                        phone_No: newAccessToken.phone_No,
                    },
                }
            );

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
