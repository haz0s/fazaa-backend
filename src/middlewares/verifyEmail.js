const httpResponse = require("../utils/httpRespone.js");
const HunterSDK = require("hunterio");

const verifyEmail = async (req, res, next) => {
    const KEY = process.env.hunterKey;

    const hunter = new HunterSDK(KEY);

    hunter.emailVerifier(
        {
            email: req.body.email,
        },
        (err, body) => {
            if (err !== null) {
                res.status(400).json(
                    httpResponse.badResponse(400, "Invalid email address")
                );
            } else {
                if (
                    body.data.status === "valid" ||
                    (body.data.status === "accept_all" && body.data.score > 65)
                ) {
                    next();
                }
            }
        }
    );
};

module.exports = { verifyEmail };
