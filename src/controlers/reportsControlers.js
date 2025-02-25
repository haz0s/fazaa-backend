// models
const { ServiceReport } = require("../models");

// middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");

// utils
const httpResponse = require("../utils/httpRespone");

// Get all reports
const findAllReports = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = parseInt(query.limit, 10) || 10;
    const page = parseInt(query.page, 10) || 1;
    const offset = (page - 1) * limit;

    // ge reports from DB
    const reports = await ServiceReport.findAll({ limit, offset });

    res.status(200).json(httpResponse.goodResponse(200, reports));
});

// Create a report
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

    // Save to DB
    const report = await Report.create({
        ReportID,
        RequestObj,
        DateOfReport,
        FinalServiceCost,
        RatingValue,
        Role,
        Comments,
    });

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            report,
            "Report created successfully",
            newToken
        )
    );
});

// Get one 
const oneReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;

    const report = await Report.findByPk(reportID);

    if (!report) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Report not found"));
    }

    res.status(200).json(httpResponse.goodResponse(200, report));
});

// Delete a report
const deleteReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;

    const report = await Report.findByPk(reportID);
    if (!report) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Report not found"));
    }

    await report.destroy();

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            null,
            "Report deleted successfully",
            newToken
        )
    );
});

//update a report
const editReport = asyncWrapper(async (req, res) => {
    const reportID = req.params.id;
    const newReportData = req.body;

    const report = await Report.findByPk(reportID);
    if (!report) {
        return res
            .status(404)
            .json(httpResponse.badResponse(404, "Report not found"));
    }

    await report.update(newReportData);

    let newToken = req.currentUser?.newAccessToken || null;

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            report,
            "Report updated successfully",
            newToken
        )
    );
});

module.exports = {
    findAllReports,
    oneReport,
    deleteReport,
    editReport,
    createReport,
};