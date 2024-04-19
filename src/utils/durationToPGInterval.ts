/**
 * @file Utility functions for converting Moment.js durations to PostgreSQLs interval string and opposite.
 * @module ClockOperation
 * @author Torjus A.M
 */
import {duration, Duration} from "moment";
import {Interval} from "./types";

export function durationToPostgresInterval(duration: Duration): string {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const milliseconds = duration.milliseconds();

    return `${hours} hours ${minutes} minutes ${seconds} seconds ${milliseconds} milliseconds`;
}

// Takes in an interval and returns it as a moment duration object.
export function intervalToDuration(interval: Interval): Duration {
    if (!interval)
        return duration();

    return duration({
        hours: interval.hours || 0,
        minutes: interval.minutes || 0,
        seconds: interval.seconds || 0,
        milliseconds: interval.milliseconds || 0
    });
}