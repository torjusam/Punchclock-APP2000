/**
 * @file Function for performing a clock-Change operation.
 * @module ClockOperation
 * @Author Thomas H
 * @editor Ask I.P.A
 */
import Employee from "../../../../utils/employee";

/**
 * Performs a clock-in operation for an employee.
 *
 * @param {Employee} employee - The employee who is clocking in.
 * @param oldClockIn - the old clockIn date used to find the specific shift to edit
 * @param oldclockIn - the old clockOut date used to find the specific shift to edit
 * @param newClockIn - the new clock in date
 * @param newClockOut - the new clock out date
 * @throws {TypeError} - Throws a TypeError if the employee is already clocked in.
 * @throws {Error} - Throws an Error if the response from the server is not ok.
 */
export const clockChange = async (employee: Employee, oldClockIn: Date, oldClockOut: Date, newClockIn: Date, newClockOut: Date) => {
    try {
        const response = await fetch('/api/extras/clockChange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newClockIn, newClockOut, employee, oldClockIn, oldClockOut}),
        });
        if (!response.ok) {
            throw new Error('Feil ved shift endring!');
        }
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        console.error('Error performing check operation:', error);
        throw error;
    }
};