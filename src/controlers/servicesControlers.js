//models

//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

//get all products
const allServices = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all services from DB

    res.status(200).json(httpResponse.goodResponse(200, services));
});

//get one product
const oneService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;
    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if service exists in DB, if not:
    // return res
    //         .status(400)
    //         .json(httpResponse.badResponse(400, "Invalid data"));

    res.status(200).json(httpResponse.goodResponse(200, service));
});

//create product
const createService = asyncWrapper(async (req, res) => {
    const {
        Provider_Service_ID,
        ServiceObj,
        Description,
        InitialCheckUpCost,
        ServiceName,
    } = req.body;

    if (
        !Provider_Service_ID ||
        !ServiceObj ||
        !Description ||
        !InitialCheckUpCost ||
        !ServiceName
    ) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if service already exists, is so:
    // return res
    //         .status(400)
    //         .json(httpResponse.badResponse(400, "service already exists"));

    // save new service to DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            service,
            "service created successfully",
            newToken
        )
    );
});

//delete product
const deleteService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;
    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if service exists in DB, if not:
    // return res
    // .status(400)
    // .json(httpResponse.badResponse(400, "Invalid data"));

    // delete service from DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            service,
            "service deleted successfully",
            newToken
        )
    );
});

//edit || update product
const editService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;

    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const newServiceData = req.body;

    // check if service exists, if not:
    // return res
    //         .status(400)
    //         .json(httpResponse.badResponse(400, "Invalid data"));

    // save new service data to DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            service,
            "Product updated successfully",
            newToken
        )
    );
});

module.exports = {
    allServices,
    oneService,
    createService,
    deleteService,
    editService,
};
