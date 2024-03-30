// Author: Torjus A.M
import {Duration} from "moment";


// Convert a Moment.js duration object to a PostgreSQL interval string that can be inserted in the DB.
// Function to convert a moment Duration to a PostgreSQL interval string
export function durationToPostgresInterval(duration: Duration): string {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const milliseconds = duration.milliseconds();

    return `${hours} hours ${minutes} minutes ${seconds} seconds ${milliseconds} milliseconds`;
}

// Function to convert an object with properties for hours, minutes, seconds, and milliseconds to a PostgreSQL interval string
// Function to convert an object with properties for hours, minutes, seconds, and milliseconds to a PostgreSQL interval string
export function objectToPostgresInterval(duration: any): string {
    if (!duration) {
        return '00 hours 00 minutes 00 seconds 00 milliseconds';
    }
    const {hours, minutes = 0, seconds = 0, milliseconds = 0} = duration;

    const hoursString = hours !== undefined ? `${hours} hours ` : '00 hours ';

    return `${hoursString}${minutes} minutes ${seconds} seconds ${milliseconds} milliseconds`;
}
