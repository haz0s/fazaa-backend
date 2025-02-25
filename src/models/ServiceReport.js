// src/models/ServiceReport.js
import ServiceRequest from './ServiceRequest.js';

class ServiceReport {
    constructor(ReportID, RequestObj, DateOfReport, FinalServiceCost, RatingValue, Role, Comments) {
        this.ReportID = ReportID;
        this.RequestObj = RequestObj; // Instance of ServiceRequest
        this.DateOfReport = DateOfReport;
        this.FinalServiceCost = FinalServiceCost;
        this.RatingValue = RatingValue;
        this.Role = Role; // Role (e.g., 0 = User, 1 = Provider)
        this.Comments = Comments;
    }

    // Getters and Setters
    GetRequest() {
        return this.RequestObj;
    }

    SetRequest(RequestObj) {
        this.RequestObj = RequestObj;
    }

    GetDateOfReport() {
        return this.DateOfReport;
    }

    SetDateOfReport(Date) {
        this.DateOfReport = Date;
    }

    GetFinalCost() {
        return this.FinalServiceCost;
    }

    SetFinalCost(Cost) {
        this.FinalServiceCost = Cost;
    }

    GetRating() {
        return this.RatingValue;
    }

    SetRating(Rating) {
        this.RatingValue = Rating;
    }

    GetRole() {
        return this.Role;
    }

    SetRole(Role) {
        this.Role = Role;
    }

    GetComments() {
        return this.Comments;
    }

    SetComments(Comment) {
        this.Comments = Comment;
    }

    // Method to display report details
    DisplayReport() {
        console.log(`Report ID: ${this.ReportID}`);
        console.log(`Service Request ID: ${this.RequestObj.Request_ID}`);
        console.log(`Date of Report: ${this.DateOfReport}`);
        console.log(`Final Service Cost: $${this.FinalServiceCost}`);
        console.log(`Rating: ${this.RatingValue} Stars`);
        console.log(`Role: ${this.Role === 0 ? 'User' : 'Provider'}`);
        console.log(`Comments: ${this.Comments}`);
    }
}

export default ServiceReport;
