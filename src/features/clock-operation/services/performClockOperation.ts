/**
 * @file Responsible for performing the clock in/out operation. Handles errors, and calls on toast-notifications.
 * @module ClockOperation
 * @author Torjus A.M, Thomas H
 */
import Employee from '../../../utils/employee';
import {clockIn} from './clockIn';
import {clockOut} from "./clockOut";
import moment from 'moment';
import {toast} from 'react-toastify';

/**
 * Performs the clock in/out operation for an employee.
 *
 * @param {Employee} employee - The employee to be clocked in/out.
 * @param {(isLoading: boolean) => void} setIsLoading - Function to set the loading state.
 * @param {(employee: Employee) => void} updateEmployeeStatus - Function to update the employee's status.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const clockInOutOperation = async (
    employee: Employee,
    setIsLoading: (isLoading: boolean) => void,
    updateEmployeeStatus: (employee: Employee) => void
) => {
    setIsLoading(true);

    try {
        // Defines time of the operation, then passes it to the clocking function.
        // This is to ensure the operations are always working with the same time.
        const currentTime = new Date();
        console.log(currentTime);
        // Determine the function to use based on the employee's clocked in status
        const checkFunction = employee.isClockedIn ? clockOut : clockIn;
        const result = await checkFunction(employee, currentTime);

        if (result) {
            await updateEmployeeStatus(employee);
            toast.success(
                'Stemplet ' + (employee.isClockedIn ? 'ut ' : 'inn ') +
                employee.name + ' Kl. ' + moment(currentTime).format('HH:mm')
            );
        }
    } catch (error) {
        if (error instanceof RangeError) {
            // If it's a RangeError, do nothing. Means worktime is negative, just needs to try again.
            toast.error(error.message);
            return;
        } else {
            // TODO: Handle error. Refresh page? Likely something wrong with app-layer or server.
            console.error(error);
            toast.error(error.message), {autoClose: 10000};
        }
    } finally {
        setIsLoading(false);
    }
};