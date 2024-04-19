/**
 * @file Defines the Employee class
 * @Author Torjus A.M
 */
import moment from 'moment';
import {Interval} from "./types";

/**
 * Represents an employee with personal and work-related details.
 * @class
 * @classdesc This class encapsulates all the personal and work-related attributes of an employee.
 *
 * @property {number} id - Unique ID.
 * @property {string} name - Full name.
 * @property {number} [pin] - Personal pin-number.
 * @property {string} [profilePictureUrl] - URL pointing to the employee's profile picture.
 * @property {Date} [lastCheckIn] - Timestamp of the last check-in.
 * @property {Date} [lastCheckOut] - Timestamp of the last check-out.
 * @property {string} PlannedWork - Planned work hours for the employee, in ISO 8601 duration format.
 * @property {Interval} [balance] - The current balance of work hours as an interval.
 * @property {boolean} isClockedIn - Indicates whether the employee is currently clocked in. Derived from check-in/out timestamps.
 * @property {moment.Duration} [dailyWorkTime] - Daily work time as a moment.js Duration object.
 * @property {boolean} [isWorkTimeReached] - Flag indicating if the planned daily work time has been reached.
 */
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
        this.isClockedIn = (this.lastCheckIn && this.lastCheckOut && this.lastCheckIn > this.lastCheckOut);
    }
}

export default Employee;