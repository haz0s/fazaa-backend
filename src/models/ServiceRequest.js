// src/models/ServiceRequest.js
import User from './User.js';
import ServiceProvider from './ServiceProvider.js';

class ServiceRequest {
    constructor(Request_ID, UserObj, ProviderObj, ServiceType_ID, DateOfSubmission, Description, Status) {
        this.Request_ID = Request_ID;
        this.UserObj = UserObj; // User instance
        this.ProviderObj = ProviderObj; // ServiceProvider instance
        this.ServiceType_ID = ServiceType_ID;
        this.DateOfSubmission = DateOfSubmission;
        this.Description = Description;
        this.Status = Status; // Status (e.g., 0 = Pending, 1 = In Progress, 2 = Completed)
    }

    // Getters and Setters
    GetUserObj() {
        return this.UserObj;
    }

    SetUserObj(UserObj) {
        this.UserObj = UserObj;
    }

    GetProviderObj() {
        return this.ProviderObj;
    }

    SetProviderObj(ProviderObj) {
        this.ProviderObj = ProviderObj;
    }

    GetStatus() {
        return this.Status;
    }

    SetStatus(Status) {
        this.Status = Status;
    }

    GetDateOfSubmission() {
        return this.DateOfSubmission;
    }

    SetDateOfSubmission(Date) {
        this.DateOfSubmission = Date;
    }

    GetDescription() {
        return this.Description;
    }

    SetDescription(Desc) {
        this.Description = Desc;
    }

    // Method to update request status
    UpdateStatus(newStatus) {
        this.Status = newStatus;
        console.log(`Request ${this.Request_ID} status updated to ${newStatus}`);
    }

    // Method to display request details
    DisplayRequestDetails() {
        console.log(`Request ID: ${this.Request_ID}`);
        console.log(`User: ${this.UserObj.GetFirstName()} ${this.UserObj.GetLastName()}`);
        console.log(`Provider: ${this.ProviderObj.GetFirstName()} ${this.ProviderObj.GetLastName()}`);
        console.log(`Service Type ID: ${this.ServiceType_ID}`);
        console.log(`Date Submitted: ${this.DateOfSubmission}`);
        console.log(`Description: ${this.Description}`);
        console.log(`Status: ${this.Status}`);
    }
}

export default ServiceRequest;
