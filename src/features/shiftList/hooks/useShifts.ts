/**
 * @file Hook for fetching shifts for a given employee.
 * @module ShiftList
 * @memberof EmployeePage
 * @author Torjus A.M
 */
import {useEffect, useState} from 'react';
import Employee from "../../../utils/employee";
import {Shift} from "../../../utils/types";

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

/**
 * Function fetches the shift data for a given employee from the server, using the employee's id.
 *
 * @param {Employee} employee - The employee for whom to fetch the shift data.
 * @returns {Promise<Shift[]>} - A promise that resolves to an array of `Shift` objects.
 * @throws {Object} - An object with the status and message of the error.
 */
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