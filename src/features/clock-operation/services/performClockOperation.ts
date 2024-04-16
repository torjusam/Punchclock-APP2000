/* 
    Author: Torjus A.M, Thomas H
    Responsible for performing the clock in/out operation.
    Handles errors, and calls on toast-notifications.
*/
import {Employee} from '../../../lib/types/employee';
import {clockIn, clockOut} from '../services/';
import moment from 'moment';
import {toast} from 'react-toastify';

export const clockInOutOperation = async (
    employee: Employee,
    balance: any,
    setIsLoading: (isLoading: boolean) => void,
    updateEmployeeStatus: (employee: Employee) => void
) => {
    // Start loading
    setIsLoading(true);

    // Author: Torjus A.M
    try {
        const currentTime = new Date();
        // Determine the function to use based on the employee's clocked in status
        const checkFunction = employee.isClockedIn ? clockOut : clockIn;
        const result = await checkFunction(employee, currentTime);

        // Author: Thomas H
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