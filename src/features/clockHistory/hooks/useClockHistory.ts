/*
    Author: Torjus A.M
    Custom hook for accessing the employees time clock history, and setting a state variable with it.
*/
import { useState, useEffect } from 'react';

const useClockHistory = (employee) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await performFetch(employee);
            setData(result);
            setIsLoading(false);
        };

        fetchData();
    }, [employee.lastCheckIn, employee.lastCheckOut]);

    return { data, isLoading };
};

export default useClockHistory;


const performFetch = async (employee) => {
    const employeeId = employee.id;
    const response = await fetch('/api/getClockHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId }),
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error:', response.status);
        return [];
    }
};