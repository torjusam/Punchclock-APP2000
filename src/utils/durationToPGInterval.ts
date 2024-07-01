// Utility functions for converting Moment.js durations to PostgreSQLs interval string and opposite.
import {duration, Duration} from "moment";
import {Interval} from "./types";

export function durationToPostgresInterval(d: Duration): string {
    const totalHours = Math.floor(d.asHours());

    return `${totalHours} hours ${d.minutes()} minutes ${d.seconds()} seconds ${d.milliseconds()} milliseconds`;
}

export function intervalToDuration(i: Interval): Duration {
    if (!i) return duration();

    return duration({
        hours: i.hours || 0,
        minutes: i.minutes || 0,
        seconds: i.seconds || 0,
        milliseconds: i.milliseconds || 0
    });
}