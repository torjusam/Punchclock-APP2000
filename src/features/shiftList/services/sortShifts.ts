/**
 * @file Helper functions used in the shiftList.
 * @module ShiftList
 * @memberof EmployeePage
 * @author Torjus A.M
 */
import moment from 'moment';
import {Shift} from "../../../utils/types";

/**
 * Groups shifts by month.
 * @param {Shift[]} shifts - An array of shifts to group by month.
 * @returns {Object} An object where the keys are the months, and the values are arrays of shifts.
 */
export function groupShiftsByMonth(shifts: Shift[]): { [month: string]: Shift[] } {
    const shiftsByMonth: { [month: string]: Shift[] } = {};
    shifts.forEach(shift => {
        const monthYear = moment(shift.start).format('MMM YYYY');
        if (!shiftsByMonth[monthYear]) {
            shiftsByMonth[monthYear] = [];
        }
        shiftsByMonth[monthYear].push(shift);
    });
    return shiftsByMonth;
}

/**
 * Sort months in ascending order.
 * @param {Object} shiftsByMonth - An object where the keys are the months and the values are arrays of shifts.
 * @returns {string[]} An array of the months sorted in ascending order.
 */
export function sortMonths(shiftsByMonth: { [month: string]: Shift[] }): string[] {
    return Object.keys(shiftsByMonth).sort(
        (a, b) =>
            moment(a, 'MMM YYYY').valueOf() -
            moment(b, 'MMM YYYY').valueOf()
    );
}