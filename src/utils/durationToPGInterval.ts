/**
 * @file Utility functions for converting Moment.js durations to PostgreSQLs interval string and opposite.
 * @module ClockOperation
 * @author Torjus A.M
 */
import {duration, Duration} from "moment";
import {Interval} from "./types";

/**
 * Converts a Moment.js duration object to a PostgreSQL interval string.
 * @param d - Moment Duration object
 * @returns String compatible with PG interval type
 */
export function durationToPostgresInterval(d: Duration): string {
    const totalHours = Math.floor(d.asHours());

    return `${totalHours} hours ${d.minutes()} minutes ${d.seconds()} seconds ${d.milliseconds()} milliseconds`;
}

/**
 * Converts a PostgreSQL interval to a Moment.js duration object.
 * @param i - Interval object
 * @returns A Duration object
 */
export function intervalToDuration(i: Interval): Duration {
    if (!i) return duration();

    return duration({
        hours: i.hours || 0,
        minutes: i.minutes || 0,
        seconds: i.seconds || 0,
        milliseconds: i.milliseconds || 0
    });
}