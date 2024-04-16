/**
 * @Author Torjus A.M
 */
import {Interval} from '../../../lib/types/types';

/**
 * Formats the given interval into a string representation.
 *
 * The function takes an interval object as input and returns a string that represents the interval.
 * The string is formatted as follows:
 * - If the interval has hours, it returns a string in the format 'HHt MMm', where HH represents hours and MM represents minutes.
 * - If the interval does not have hours but has minutes, it returns a string in the format 'MMm SSs', where MM represents minutes and SS represents seconds.
 * - If the interval does not have hours or minutes, it returns a string in the format '00m SSs', where SS represents seconds.
 *
 * If the interval is null or undefined, the function returns '-'.
 *
 * @param {Interval} interval - The interval to format.
 * @returns {string} A string representation of the interval.
 */
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