import moment from 'moment';
import {Interval} from "./types";

class Employee {
    id: number;
    name: string;
    pin?: number;
    profilePictureUrl?: string;
    lastCheckIn?: Date;
    lastCheckOut?: Date;
    PlannedWork: string;
    balance?: Interval;
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
        // Sets clocked in status automatically
        this.isClockedIn = (this.lastCheckIn && this.lastCheckOut && this.lastCheckIn > this.lastCheckOut);
    }
}

export default Employee;