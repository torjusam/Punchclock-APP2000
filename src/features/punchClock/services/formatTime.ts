/* 
    Author: Torjus A.M
    Helper function to format time: hh't' mm'm' ss's': For example: 00t 24m 12s
*/
import moment from 'moment';

export const formatTime = (seconds: number) => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours}t ${minutes}m ${secs}s`;
};