// src/models/User.js
import supabase from '../db/supabaseClient.js';
import Person from './Person.js';

class User extends Person {
    constructor(personId, firstName, lastName, gender, location, nationalNo, userId, cachedAvgRating, numOfRating) {
        super(personId, firstName, lastName, gender, location, nationalNo);
        this.userId = userId;
        this.cachedAvgRating = cachedAvgRating;
        this.numOfRating = numOfRating;
    }

    // Database insertion
    async save() {
        const { data, error } = await supabase
            .from('Users')
            .insert([{
                UserId: this.userId,
                FirstName: this.GetFirstName(),
                LastName: this.GetLastName(),
                Gender: this.GetGender(),
                Location: this.GetLocation(),
                National_No: this.GetNationalNo(),
                CachedAvgRating: this.cachedAvgRating,
                NumOfRating: this.numOfRating
            }]);

        if (error) {
            console.error('Error adding user:', error);
            return null;
        }
        console.log('User added successfully:', data);
        return data;
    }

    // Functional Methods
    SubmitReq() {
        console.log("Submitting request...");
        return true; // Placeholder for actual logic
    }

    GenerateServiceReport() {
        console.log("Generating service report...");
        return true;
    }

    CancelService() {
        console.log("Cancelling service...");
        return true;
    }

    ViewServiceHistory() {
        console.log("Viewing service history...");
    }
}

export default User;
