// Author: Torjus A.M - Helper function to convert a Moment.js duration object to a PostgreSQL interval string that can be inserted in the DB.
import {Duration} from "moment";

export function durationToPostgresInterval(duration: Duration) {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}
