/*
    Author: Torjus A.M
    Defines the layout of the personalPage, and exports it.
    Responsible for wrapping data on the page with context providers.
*/
import moment from 'moment';
import {Shift} from "../../../lib/types/types";

// Function to group shifts by month
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

// Function to sort months in ascending order
export function sortMonths(shiftsByMonth: { [month: string]: Shift[] }): string[] {
    return Object.keys(shiftsByMonth).sort((a, b) => moment(a, 'MMM YYYY').valueOf() - moment(b, 'MMM YYYY').valueOf());
}