/*
    Author: Torjus A.M
    Custom hook for accessing the employees time clock history, and performing
    operations on the data to calculate and format worktime and fleksitd-salary.
*/
import { useState, useEffect } from 'react';

const useClockHistory = (employee) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await performFetch(employee);
            setData(result);
        };

        fetchData();
    }, [employee.lastCheckIn, employee.lastCheckOut]);

    return data;
};

export default useClockHistory;


const performFetch = async (employee) => {

    const response = await fetch('/api/getClockHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee }),
    });

    if (!response.ok) {
        throw new Error('Failed to perform check operation');
    }
};