// src/models/ServiceProvider_Services.js
import Services from './Services.js';

class ServiceProvider_Services {
    constructor(Provider_Service_ID, ServiceObj, Description, InitialCheckUpCost) {
        this.Provider_Service_ID = Provider_Service_ID;
        this.ServiceObj = ServiceObj;
        this.Description = Description;
        this.InitialCheckUpCost = InitialCheckUpCost;
    }

    // Getters and Setters
    GetProviderServiceID() {
        return this.Provider_Service_ID;
    }

    SetProviderServiceID(ID) {
        this.Provider_Service_ID = ID;
    }

    GetServiceObj() {
        return this.ServiceObj;
    }

    SetServiceObj(ServiceObj) {
        if (ServiceObj instanceof Services) {
            this.ServiceObj = ServiceObj;
        } else {
            console.error("Invalid Service object.");
        }
    }

    GetDescription() {
        return this.Description;
    }

    SetDescription(Desc) {
        this.Description = Desc;
    }

    GetInitialCost() {
        return this.InitialCheckUpCost;
    }

    SetInitialCost(Cost) {
        if (typeof Cost === "number" && Cost >= 0) {
            this.InitialCheckUpCost = Cost;
        } else {
            console.error("Initial cost must be a non-negative number.");
        }
    }
}

export default ServiceProvider_Services;
