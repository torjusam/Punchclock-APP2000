/* 
    Author: Torjus A.M
    Responsible for performing the clock in/out operation, and calling on notification toasts to display.
*/
import { Employee } from '../../../lib/employee';
import { clockIn, clockOut } from '../services/';
import moment from 'moment';
import { toast } from 'react-toastify';

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
            toast.error("Ugyldig utstempling, prøv igjen.");
            return;
        } else {
            // To-Do: Do something with error, make button unpressable and ask user to get an admin? 
            console.error(error);
            toast.error('Feil ved stempling, prøv igjen senere.');
            return;
        }
    } finally {
        setIsLoading(false);
    }
};