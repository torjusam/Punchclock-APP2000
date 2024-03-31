// Author: Torjus A.M
import moment from "moment/moment";

export function formatTimer(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours}t ${minutes}m ${secs}s`;
}
