//Author: Torjus A.M
export class Employee {
    id: number;
    name: string;
    role: string;
    pin?: number;
    profilePictureUrl?: string;
    lastCheckIn?: Date | null;
    lastCheckOut?: Date | null;
    PlannedWork?: any;
    Balance?: any;
    Fleksitd_Balance?: any;
    isClockedIn: boolean;

    constructor(
        id: number,
        name: string,
        role?: string,
        pin?: number,
        profilePictureUrl?: string,
        lastCheckIn?: Date,
        lastCheckOut?: Date,
        shiftStart?: Date,
        shiftEnd?: Date
    ) {
        this.id = id;
        this.name = name;
        this.lastCheckIn = lastCheckIn;
        this.lastCheckOut = lastCheckOut;
        this.profilePictureUrl = profilePictureUrl;

        // Sets isClockedIn to false if lastCheckOut is newer than lastCheckIn. Defaults to false
        if (this.lastCheckIn && this.lastCheckOut) {
            this.isClockedIn = this.lastCheckIn > this.lastCheckOut;
        } else {
            this.isClockedIn = false
        }

        // Log for testing
        console.log(
            `${this.name}: isClockedIn: ${this.isClockedIn}. 
            Last checkin: ${this.lastCheckIn}. Last checkout: ${this.lastCheckOut}`
        );
    }


}