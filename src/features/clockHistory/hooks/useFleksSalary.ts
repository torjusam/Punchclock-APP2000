/**
 * @file Fetches fleks salary, updates independently of the clock history table, whenever the employee checks out.
 * @module ClockHistory
 * @author Torjus A.M
 */
import {useState, useEffect} from 'react';
import Employee from "../../../utils/employee";
import {defaultInterval, Interval} from "../../../utils/types";

/**
 * Custom Hook to fetch and manage the state of an employee's fleks salary.
 * @author Torjus A.M
 * @param {Employee} employee - The employee object for which the fleks salary is to be fetched.
 * @returns {Object} An object containing the fleks salary as an Interval and a loading state.
 */
const useFleksSalary = (employee: Employee) => {
    const [fleksSalary, setfleksSalary] = useState(defaultInterval());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetchFleksSalary(employee)
            .then(result => {
                if (result && result[0]) {
                    const fSalary = result[0].fleksitid_balance;
                    if (fSalary) {
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
                    } else {
                        setfleksSalary(defaultInterval());
                    }
                } else {
                    setfleksSalary(defaultInterval());
                }
            })
            .finally(() => setIsLoading(false));
    }, [employee.lastCheckOut]);

    return {fleksSalary, isLoading};
};

export default useFleksSalary;

/**
 * Performs the actual fetch from the server.
 * @author Thomas H
 * @param {Employee} employee - The employee object for which the fleks salary is to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array containing the fleks salary data.
 */
const fetchFleksSalary = async (employee: Employee) => {
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