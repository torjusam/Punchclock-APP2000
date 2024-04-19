/**
 * @file Sets the employee and their data before setting the selectedEmployee-context, and going to their page.
 * @module EmployeePage
 * @description In react, the objects passed to children are read-only, and cannot be modified directly, therefore we need to
 * find the employee, calculate and set its dailyworktime & balance, before using this employee in the context.
 * This way the children can use these values directly using employee.balance etc. without having to calculate it themselves.
 * @author Torjus A.M
 */
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import moment, {duration} from 'moment';
import Employee from '../utils/employee';
import {useEmployeeContext} from '../features/context/employeeContext';
import {fetchBalance} from "../features/context/services/workIntervalsAPI";

/**
 * Hook for fetching and setting up data for an employee's page based on the employee ID from the URL.
 * Retrieves employee details from the global context, calculates daily work time, fetches current balance,
 * and updates these details before setting them into local state for use in rendering the employee's page.
 * @returns {Employee | undefined} The employee's updated data ready for use, or undefined if the data could not be fetched or the employee was not found.
 */
export const useEmployeePageData = () => {
    const [employeePageData, setEmployeeData] = useState<Employee | undefined>();
    const {employees} = useEmployeeContext();
    const router = useRouter();
    // Finds the employee.id by using the url.
    const {employeeId} = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (employeeId) {
                // Finds the employee from the global context by comparing the employeeId from the url.
                const foundEmployee = employees.find(
                    (employee) => employee.id === Number(employeeId)
                );

                if (foundEmployee) {
                    // Convert the employee's planned work-time to a daily duration in milliseconds
                    // by dividing weekly plannedwork by 5 (days in a week), then to a moment duration.
                    foundEmployee.dailyWorkTime = duration(
                        duration(foundEmployee.PlannedWork).asMilliseconds() / 5
                    );

                    // Fetch the employee's balance and set it
                    foundEmployee.balance = await fetchBalance(foundEmployee);
                }
                setEmployeeData(foundEmployee);
            }
        };

        fetchData();
    }, [employeeId, employees]);

    return employeePageData;
};