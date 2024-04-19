/**
 * @file Sorting algorithm for the employee-list.
 * @Author Torjus A.M
 */
import Employee from "../../../lib/types/employee";
import moment from "moment/moment";

/**
 * Sorts a list of employees based on their clock-in status and the recency of their clock operations.
 *
 * The function first checks if an employee is clocked in or not. If an employee is clocked in and the other is not,
 * the clocked in employee is placed before the clocked out employee.
 *
 * If both employees have the same clock-in status, the function then checks the recency of their clock operations.
 * If both employees are clocked in, it compares their last check-in times. If both employees are clocked out, it compares
 * their last check-out times.
 *
 * If the last check-in or check-out time of an employee is null or undefined, the employee is moved to the end of the list.
 *
 * @param {Employee[]} employees - The list of employees to sort.
 * @returns {Employee[]} The sorted list of employees.
 */
export function sortEmployees(employees: Employee[]) {
    return [...employees].sort((a, b) => {
        // If employee a is clocked in and employee b is not, return -1, which means a comes before b.
        if (a.isClockedIn && !b.isClockedIn) {
            return -1;
        } else if (!a.isClockedIn && b.isClockedIn) {
            return 1;
        } else {
            const aLastCheckTime = a.isClockedIn ? moment(a.lastCheckIn) : moment(a.lastCheckOut);
            const bLastCheckTime = b.isClockedIn ? moment(b.lastCheckIn) : moment(b.lastCheckOut);

            // If either lastCheckTime is null or undefined, move to the end of the list.
            if (!aLastCheckTime.isValid()) {
                return 1;
            } else if (!bLastCheckTime.isValid()) {
                return -1;
            } else {
                // If both lastCheckTimes are valid, compare them.
                return bLastCheckTime.diff(aLastCheckTime);
            }
        }
    });
}