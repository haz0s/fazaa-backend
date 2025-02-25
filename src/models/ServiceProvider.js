// src/models/ServiceProvider.js
import Person from './Person.js';

class ServiceProvider extends Person {
    constructor(Provider_ID, Availability, NumOfRatings, CachedAvgRating, PersonID, FirstName, LastName, Gender, Location, National_No) {
        super(PersonID, FirstName, LastName, Gender, Location, National_No);
        this.Provider_ID = Provider_ID;
        this.Availability = Availability;
        this.NumOfRatings = NumOfRatings;
        this.CachedAvgRating = CachedAvgRating;
    }

    // Getters and Setters
    GetProviderID() {
        return this.Provider_ID;
    }

    SetProviderID(Provider_ID) {
        this.Provider_ID = Provider_ID;
    }

    GetAvailability() {
        return this.Availability;
    }

    SetAvailability(Availability) {
        this.Availability = Availability;
    }

    GetNumOfRatings() {
        return this.NumOfRatings;
    }

    SetNumOfRatings(NumOfRatings) {
        this.NumOfRatings = NumOfRatings;
    }

    GetCachedAvgRating() {
        return this.CachedAvgRating;
    }

    SetCachedAvgRating(CachedAvgRating) {
        this.CachedAvgRating = CachedAvgRating;
    }

    // Functional Methods
    AcceptServiceReq(serviceRequest) {
        if (this.Availability) {
            console.log(`Service request ${serviceRequest.Request_ID} accepted by provider ${this.FirstName} ${this.LastName}.`);
            serviceRequest.SetStatus(1); // Example: 1 = Accepted
        } else {
            console.log(`Provider ${this.FirstName} ${this.LastName} is not available.`);
        }
    }

    DeclineServiceReq(serviceRequest) {
        console.log(`Service request ${serviceRequest.Request_ID} declined by provider ${this.FirstName} ${this.LastName}.`);
        serviceRequest.SetStatus(3); // Example: 3 = Declined
    }

    CompleteService(serviceRequest) {
        console.log(`Service request ${serviceRequest.Request_ID} completed by provider ${this.FirstName} ${this.LastName}.`);
        serviceRequest.SetStatus(2); // Example: 2 = Completed
    }

    GenerateUserReport(user, serviceRequest) {
        console.log(`Generating service report for user ${user.FirstName} ${user.LastName}.`);
        return {
            User: user.FirstName + ' ' + user.LastName,
            ServiceRequestID: serviceRequest.Request_ID,
            Provider: this.FirstName + ' ' + this.LastName,
            Rating: this.CachedAvgRating,
            Status: serviceRequest.GetStatus(),
        };
    }
}

export default ServiceProvider;
