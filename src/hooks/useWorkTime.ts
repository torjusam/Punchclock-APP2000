/*
    Author: Torjus A.M
    This hook is used to fetch the employees worktime and fleksitidSaldo from the database, 
    and calculate fleksitid_salary and worktime.
*/
import { useState, useEffect } from 'react';

const useWorkTime = (employee) => {
    const [workTimedata, setworkTimedata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await performFetch(employee);
            setworkTimedata(result);
            setIsLoading(false);
        };

        fetchData();
    }, [employee.lastCheckIn, employee.lastCheckOut]);

    return { workTimedata, isLoading };
};

export default useWorkTime;


const performFetch = async (employee) => {
    const employeeId = employee.id;
    const response = await fetch('/api/getWorkTime', {
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