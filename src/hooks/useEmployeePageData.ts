/* 
    Author: Torjus A.M

    Hook to go to the employees personal page, by finding them in the global employee context. The selected employee
    is passed down to the pagaData component, which passes it down to the children components and their children etc.

    In react, the objects passed to children are read-only, and cannot be modified directly, therefore we need to 
    find the employee, calculate and set its dailyworktime, then pass that employee down to the children. 
    This way the children can use this value directly, without having to calculate it themselves.
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
                    e.g: 40 hours = 2,400,000 milliseconds, 2,400,000 / 5 = 480,000 milliseconds (8 hours a day).
                    Using milliseconds for accurate calculations, though it's less readable.
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