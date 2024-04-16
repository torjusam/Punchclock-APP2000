/*
    Author: Torjus A.M
    Custom hook for fetching the fleks salary for an employee.
    Updates independently of the clock history table, whenever the employee checks out.
*/
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";
import {defaultInterval, Interval} from "../../../lib/types/types";

const useFleksSalary = (employee: Employee) => {
    const [fleksSalary, setfleksSalary] = useState(defaultInterval());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetchFleksSalary(employee)
            .then(result => {
                if (result && result[0]) {
                    const fSalary = result[0].fleksitid_balance;
                    // Cast the result (first row) to the Interval type
                    const interval = {
                        years: fSalary.years,
                        months: fSalary.months,
                        days: fSalary.days,
                        hours: fSalary.hours,
                        minutes: fSalary.minutes,
                        seconds: fSalary.seconds,
                        milliseconds: fSalary.milliseconds
                    } as Interval;
                    setfleksSalary(interval);
                    console.log(fleksSalary)
                } else {
                    setfleksSalary(defaultInterval());
                }
            })
            .finally(() => setIsLoading(false));
    }, [employee.lastCheckOut]);

    return {fleksSalary, isLoading};
};

export default useFleksSalary;

export const fetchFleksSalary = async (employee: Employee) => {
    const employeeId = employee.id;
    const response = await fetch('/api/workIntervals/getFleksBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({employeeId}),
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error:', response.status);
        return [];
    }
}