/*
    Author: Torjus A.M
    Custom hook for fetching the fleks salary for an employee.
    Updates independently of the clock history table, whenever the employee checks out.
*/
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";

const useFleksSalary = (employee: Employee) => {
    const [fleksSalary, setfleksSalary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await performFetch(employee);
            setfleksSalary(result);
            setIsLoading(false);
        };

        fetchData();
    }, [employee.lastCheckOut]);

    return {fleksSalary, isLoading};
};

export default useFleksSalary;

export const performFetch = async (employee: Employee) => {
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
};