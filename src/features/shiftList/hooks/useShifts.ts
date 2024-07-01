import {useEffect, useState} from 'react';
import Employee from "../../../utils/employee";
import {Shift} from "../../../utils/types";

// Hook fetches shifts for given employee
const useShifts = (employee: Employee) => {
    const [shifts, setShifts] = useState<Shift[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!employee) return;

        setIsLoading(true);
        const fetchData = async () => {
            const result = await performFetch(employee);
            setShifts(result);
            setIsLoading(false);
        };
        fetchData();
    }, [employee?.lastCheckOut]);
    return {shifts, isLoading};
}

export default useShifts;

// Fetches using the employees ID
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