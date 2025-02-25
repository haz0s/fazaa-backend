//models

//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

//get all categories
const allReports = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all reports from DB

    res.status(200).json(httpResponse.goodResponse(200, categories));
});

//create category
const createReport = asyncWrapper(async (req, res) => {
    const {
        ReportID,
        RequestObj,
        DateOfReport,
        FinalServiceCost,
        RatingValue,
        Role,
        Comments,
    } = req.body;

    if (
        !ReportID ||
        !RequestObj ||
        !DateOfReport ||
        !FinalServiceCost ||
        !RatingValue ||
        !Role ||
        !Comments
    ) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    //  save report to DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            report,
            "Report created successfully",
            newToken
        )
    );
});

//get one category
const oneReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;
    if (!reportID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if report exists in DB, if not:
    // return res
    //         .status(400)
    //         .json(httpResponse.badResponse(400, "Invalid data"));

    // get report from DB

    res.status(200).json(httpResponse.goodResponse(200, report));
});

//delete category
const deleteReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;
    if (!reportID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    // check if report exists, if not:
    // return res
    // .status(400)
    // .json(httpResponse.badResponse(400, "Invalid data"));

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            report,
            "Report deleted successfully",
            newToken
        )
    );
});

//edit || update category
const editReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;
    if (!reportID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const newReportData = req.body;

    // check if report exists in DB, if not:
    // return res
    //         .status(400)
    //         .json(httpResponse.badResponse(400, "Invalid data"));

    //  update report data in DB

    // return the new access token
    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            report,
            "Report updated successfully",
            newToken
        )
    );
});

module.exports = {
    allReports,
    oneReport,
    deleteReport,
    editReport,
    createReport,
};
