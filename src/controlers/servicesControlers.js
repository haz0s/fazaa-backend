// models
const { Services } = require("../models/Services"); // Correctly importing the Services model
const { ServiceProvider } = require("../models/ServiceProvider");
// middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
// utils
const httpResponse = require("../utils/httpRespone");

// get all services
const allServices = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    // get all services from DB
    const services = await Services.findAll({
        // Use Services instead of Service
        limit,
        offset,
        include: { model: ServiceProvider },
    });

    res.status(200).json(httpResponse.goodResponse(200, services));
});

// get one service
const oneService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;
    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const service = await Services.findByPk(serviceID, {
        include: { model: ServiceProvider },
    }); // Use Services instead of Service

    if (!service) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Service not found"));
    }

    res.status(200).json(httpResponse.goodResponse(200, service));
});

// create service
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

    // Check if service already exists
    const existingService = await Services.findOne({
        // Use Services instead of Service
        where: { Provider_Service_ID, ServiceObj, ServiceName },
    });

    if (existingService) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Service already exists"));
    }

    // Create new service
    const service = await Services.create({
        // Use Services instead of Service
        Provider_Service_ID,
        ServiceObj,
        Description,
        InitialCheckUpCost,
        ServiceName,
    });

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            service,
            "Service created successfully",
            newToken
        )
    );
});

// delete service
const deleteService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;
    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // Check if service exists in DB
    const service = await Services.findByPk(serviceID); // Check if service exists
    if (!service) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Service not found"));
    }

    // Delete service from DB
    await Services.destroy({
        where: { serviceId: serviceID },
    });

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            null, // No data to return for deletion
            "Service deleted successfully",
            newToken
        )
    );
});

// edit || update service
const editService = asyncWrapper(async (req, res) => {
    const serviceID = req.params.id;

    if (!serviceID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const newServiceData = req.body;

    // Check if service exists
    const service = await Services.findByPk(serviceID); // Check if service exists
    if (!service) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Service not found"));
    }

    // Update service data in DB
    await Services.update(newServiceData, {
        where: { serviceId: serviceID },
    });

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            service,
            "Service updated successfully",
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
