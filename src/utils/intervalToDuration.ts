// Author: Torjus A.M
import {Interval} from "../lib/types/types";
import moment, {Duration} from "moment";

// Takes in an interval and returns it as a moment duration object, to be able to use moment functions on it.
export function intervalToDuration(interval: Interval): Duration {
    if (!interval)
        return moment.duration();

    return moment.duration({
        hours: interval.hours || 0,
        minutes: interval.minutes || 0,
        seconds: interval.seconds || 0,
        milliseconds: interval.milliseconds || 0
    });
}