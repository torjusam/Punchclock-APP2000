//Author: Torjus A.M
export class Employee {
    id: number;
    first_name: string;
    surname: string;
    lastCheckIn?: Date;
    lastCheckOut?: Date;
    isClockedIn: boolean;
    shiftStart?: Date;
    shiftEnd?: Date;
    profilePictureUrl?: string;
    pin?: number;

    constructor(
        id: number,
        first_name: string,
        surname: string,
        lastCheckIn?: Date,
        lastCheckOut?: Date,
        shiftStart?: Date,
        shiftEnd?: Date,
        profilePictureUrl?: string
    ) {
        this.id = id;
        this.first_name = first_name;
        this.surname = surname;
        this.lastCheckIn = lastCheckIn;
        this.lastCheckOut = lastCheckOut;
        this.shiftStart = shiftStart;
        this.shiftEnd = shiftEnd;
        this.profilePictureUrl = profilePictureUrl;

        // Sets isClockedIn to false if lastCheckOut is newer than lastCheckIn. Defaults to false
        if (this.lastCheckIn && this.lastCheckOut) {
            this.isClockedIn = this.lastCheckIn > this.lastCheckOut;
        } else {
            this.isClockedIn = false;
        }

        // Log for testing
        console.log(
            `${this.first_name}: isClockedIn: ${this.isClockedIn}. 
            Last checkin: ${this.lastCheckIn}. Last checkout: ${this.lastCheckOut}`
        );
    }
}