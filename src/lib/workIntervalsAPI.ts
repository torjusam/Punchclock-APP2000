/* 
    Author Torjus A.M
    Logic for performing fetch and posts on the workTime intervals from the datbabase.
    Used in the workIntervalContext.
*/
import {Employee} from "./types/employee";

export const performFetch = async (employee) => {
    try {
        const employeeId = employee.id;
        const response = await fetch('/api/workIntervals/getBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employeeId}),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch work intervals');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const performPost = async (employee: Employee, workInterval: string) => {
    try {
        const response = await fetch('/api/workIntervals/setBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({workInterval, employee}),
        });
        if (!response.ok) {
            throw new Error('Failed to post balance to database');
        }
        return true;
    } catch (error) {
        throw error
    }
};