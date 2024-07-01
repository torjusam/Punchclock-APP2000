// Sets the employee and their data before setting the selectedEmployee-context, and going to their page.
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {duration} from 'moment';
import Employee from '../utils/employee';
import {useEmployeeContext} from '../features/context/employeeContext';
import {fetchBalance} from "../features/context/services/workIntervalsAPI";

/*
    Fetches and sets data for an employee's page using the employee ID from the URL,
    updating global context and local state with employee details, daily work time, and current balance.
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