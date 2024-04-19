/**
 * @file Sets the employee before going to their page. Finds them in the global employee context,
 * then sets their values before returning a new employee object.
 * @description In react, the objects passed to children are read-only, and cannot be modified directly, therefore we need to
 * find the employee, calculate and set its dailyworktime & balance, before using this employee in the context.
 * This way the children can use these values directly using employee.balance etc. without having to calculate it themselves.
 * @Author Torjus A.M
 */
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import moment from 'moment';
import Employee from '../lib/types/employee';
import {useEmployeeContext} from '../features/context/employeeContext';
import {fetchBalance} from "../features/context/services/workIntervalsAPI";

/**
 * Custom hook for fetching and setting the data for an employee's page.
 *
 * @returns {Employee | undefined} The data for the employee's page, or undefined if the data could not be fetched.
 */
export const useEmployeePageData = () => {
    const [employeePageData, setEmployeeData] = useState<Employee | undefined>();
    const {employees} = useEmployeeContext();
    // Uses router to go to the url/employeeId (The employees personal page).
    const router = useRouter();
    const {employeeId} = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (employeeId) {
                // Maps over and finds the specific employee from the employees array context.
                const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
                if (foundEmployee) {
                    // Convert the employee's planned work-time to a daily duration in milliseconds
                    // by dividing weekly plannedwork by 5 (days in a week), then to a moment duration.
                    foundEmployee.dailyWorkTime = moment.duration(
                        moment.duration(foundEmployee.PlannedWork).asMilliseconds() / 5
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