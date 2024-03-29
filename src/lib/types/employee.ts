/* 
    Author: Torjus A.M
    Defines the Employee class, which is used to represent an employee in the system.
    When the employees are fetched from the database, they are constructed as Employee objects.
    This makes the employees reusable in the system without having to fetch over and over again.
*/
import moment from 'moment';

export class Employee {
    id: number;
    name: string;
    pin?: number;
    profilePictureUrl?: string;
    lastCheckIn?: Date;
    lastCheckOut?: Date;
    PlannedWork: string;
    balance?: string;
    fleksitidBalance?: string;
    isClockedIn: boolean;
    dailyWorkTime?: moment.Duration;
    isWorkTimeReached?: boolean;

    constructor(
        id: number,
        name: string,
        plannedwork: string,
        pin?: number,
        profilePictureUrl?: string,
        lastCheckIn?: Date,
        lastCheckOut?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.PlannedWork = plannedwork;
        this.lastCheckIn = lastCheckIn;
        this.lastCheckOut = lastCheckOut;
        this.profilePictureUrl = profilePictureUrl;

        // Sets isClockedIn to false if lastCheckOut is newer than lastCheckIn. Defaults to false
        if (this.lastCheckIn && this.lastCheckOut) {
            this.isClockedIn = this.lastCheckIn > this.lastCheckOut;
        } else {
            this.isClockedIn = false
        }
    }
}