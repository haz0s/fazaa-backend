
class Person {
    constructor(personId, firstName, lastName, gender, location, nationalNo) {
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender; // byte
        this.location = location;
        this.nationalNo = nationalNo;
    }

    // Getter and Setter methods
    GetPersonId() {
        return this.personId;
    }

    SetPersonId(personId) {
        this.personId = personId;
    }

    GetFirstName() {
        return this.firstName;
    }

    SetFirstName(firstName) {
        this.firstName = firstName;
    }

    GetLastName() {
        return this.lastName;
    }

    SetLastName(lastName) {
        this.lastName = lastName;
    }

    GetGender() {
        return this.gender;
    }

    SetGender(gender) {
        this.gender = gender;
    }

    GetLocation() {
        return this.location;
    }

    SetLocation(location) {
        this.location = location;
    }

    GetNationalNo() {
        return this.nationalNo;
    }

    SetNationalNo(nationalNo) {
        this.nationalNo = nationalNo;
    }
}

export default Person;
