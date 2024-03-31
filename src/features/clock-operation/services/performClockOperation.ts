/* 
    Author: Torjus A.M
    Responsible for performing the clock in/out operation.
    Handles errors, and displays toast-notifications to the user.
*/
import {Employee} from '../../../lib/types/employee';
import {clockIn, clockOut} from '../services/';
import moment from 'moment';
import {toast} from 'react-toastify';

export const clockInOutOperation = async (
    employee: Employee,
    workTimeData: any,
    setIsLoading: (isLoading: boolean) => void,
    setErrorMessage: (message: string | null) => void,
    updateEmployeeStatus: (employee: Employee) => void
) => {
    setIsLoading(true);
    setErrorMessage(null); // Reset error message at the start of the operation
    try {
        const currentTime = new Date();
        const checkFunction = employee.isClockedIn ? clockOut : clockIn;
        const result = await checkFunction(employee, workTimeData, currentTime);
        if (result) {
            await updateEmployeeStatus(employee);
            toast.success('Stemplet ' + (employee.isClockedIn ? 'ut ' : 'inn ') + employee.name + ' Kl. ' + moment(currentTime).format('HH:mm'));
        }
    } catch (error) {
        if (error instanceof RangeError) {
            // If it's a RangeError, do nothing. Error is thrown if worktime is negative, just needs to try again.
            toast.error(error.message);
            return;
        } else if (error instanceof TypeError) {
            // TODO: Handle error. Likely something wrong with app-layer
            console.error(error);
            toast.error(error.message), {autoClose: 10000};
        } else {
            // Crash as its probably an error with the server.
            console.error(error);
        }
    } finally {
        setIsLoading(false);
    }
};