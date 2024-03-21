/* 
    Author: Torjus A.M
    Hook to go to the employees personal page, by finding them in the context.
    Calculates and sets the selected employees dailyworktime, used in calculating overtime.
*/
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Employee } from '../lib/employee';
import { useEmployeeContext } from '../context/employeeContext';

export const useEmployeePageData = () => {
    const [employeePageData, setEmployeeData] = useState<Employee | undefined>();
    const { employees } = useEmployeeContext();
    // Uses router to go to the url/employeeId (The employees personal page).
    const router = useRouter();
    const { employeeId } = router.query;

    useEffect(() => {
        if (employeeId) {
            // Maps over and finds the specific employee from the employees array context.
            const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
            if (foundEmployee) {
                /* 
                    Sets employees plannedwork as a duration in milliseconds, then divides them by 5. 
                    e.g: 40 hours = 2400 mins, 2400/5 = 480 mins (8 hours a day).
                    Using minutes for more accurate time, but is less readable. 
                */
                const totalMilliseconds = moment.duration(foundEmployee.PlannedWork).asMilliseconds();
                const dailyWorkTimeInMilliseconds = totalMilliseconds / 5;
                const dailyWorkTime = moment.duration(dailyWorkTimeInMilliseconds, 'milliseconds');
                foundEmployee.dailyWorkTime = dailyWorkTime;
            }
            setEmployeeData(foundEmployee);
        }
    }, [employeeId, employees]);

    return employeePageData;
};