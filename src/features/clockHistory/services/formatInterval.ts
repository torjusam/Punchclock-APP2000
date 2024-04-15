/*
    Author: Torjus A.M
    Checks for hours, minutes and seconds and displays either for example: '00m 32s' or '01t 30m'. 
    Normally if any value is undefined it would say: undefined undefined 30s.
    padStart() is used for adding leading 0's to the numbers.
    TODO: Simplify code
*/
import {Interval} from '../../../lib/types/types';

export function formatInterval(interval: Interval) {
    if (!interval) return '-';
    if (interval.hours) {
        return `
            ${interval.hours.toString().padStart(2, '0')}t 
            ${interval.minutes ?
            interval.minutes.toString().padStart(2, '0') + 'm' : '00m'
        }`;
    } else if (interval.minutes) {
        return `
        ${interval.minutes.toString().padStart(2, '0')}m 
        ${interval.seconds ?
            interval.seconds.toString().padStart(2, '0') + 's' : '00s'
        }`;
    } else {
        return `
        00m ${interval.seconds ?
            interval.seconds.toString().padStart(2, '0') + 's' : '00s'
        }`;
    }
}