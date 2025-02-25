// src/models/Services.js

class Services {
    constructor(Service_Type_ID, ServiceName) {
        this.Service_Type_ID = Service_Type_ID;
        this.ServiceName = ServiceName;
    }

    // Getters and Setters
    GetServiceTypeID() {
        return this.Service_Type_ID;
    }

    SetServiceTypeID(ID) {
        if (typeof ID === "number" && ID > 0) {
            this.Service_Type_ID = ID;
        } else {
            console.error(
                "Invalid Service Type ID. It must be a positive integer."
            );
        }
    }

    GetServiceName() {
        return this.ServiceName;
    }

    SetServiceName(Service) {
        if (typeof Service === "string" && Service.trim().length > 0) {
            this.ServiceName = Service;
        } else {
            console.error(
                "Invalid Service Name. It must be a non-empty string."
            );
        }
    }
}

module.exports = { Services };
