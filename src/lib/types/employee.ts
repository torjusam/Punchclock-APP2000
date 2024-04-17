/**
 * @file Defines the Employee class
 * @Author Torjus A.M
 */
import moment from 'moment';
import {Interval} from "./types";

/**
 * @class Employee
 * @classdesc Represents a single employee object.
 * @property {number} id
 * @property {string} name
 * @property {number} pin - The employee's pin. Would be used for personal-page authentication.
 * @property {string} profilePictureUrl - The employee's profile picture url.
 * @property {Date} lastCheckIn - The employee's last check in.
 * @property {Date} lastCheckOut - The employee's last check out.
 * @property {string} PlannedWork - The employee's planned work hours.
 * @property {string} balance - The employee's balance.
 * @property {boolean} isClockedIn - Boolean indicating if the employee is clocked in.
 * @property {moment.Duration} dailyWorkTime - The employee's daily work time.
 * @property {boolean} isWorkTimeReached - Boolean indicating if the employee's work time has been reached.
 */
export class Employee {
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