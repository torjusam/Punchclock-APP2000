/*
    Author: Torjus A.M
    This hook fetches the shifts for a given employee. Returns an array
    of type "Shift", and a boolean for loading state.
*/
import {useEffect, useState} from 'react';
import {Employee} from "../../../lib/types/employee";
import {Shift} from "../../../lib/types/types";

const useShifts = (employee: Employee) => {
    const [shifts, setShifts] = useState<Shift[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await performFetch(employee);
            setShifts(result);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return {shifts, isLoading};
}

export default useShifts;

const performFetch = async (employee: Employee) => {
    try {
        const employeeId = employee.id;
        const response = await fetch('/api/getShifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employeeId}),
        });
        if (response.ok) {
            const result = await response.json();
            // Creates array of shift objects from the json response.
            const shifts: Shift[] = result.map((shift: Shift) => ({
                id: shift.id,
                description: shift.description,
                start: shift.start,
                end: shift.end,
            }));
            return shifts;
        } else {
            console.error('Error:', response.status);
            throw {status: response.status, message: response.statusText};
        }
    } catch (error) {
        throw error;
    }
};