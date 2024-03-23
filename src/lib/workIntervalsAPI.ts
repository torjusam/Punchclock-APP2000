/* 
    Author Torjus A.M
    Logic for performing fetch and posts on the workTime intervals from the datbabase.
    Used in the workIntervalContext.
*/
import { durationToPostgresInterval } from './durationToPGInterval';
import moment from 'moment';
export const performFetch = async (employee) => {
    try {
        const employeeId = employee.id;
        const response = await fetch('/api/workIntervals/getWorkTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employeeId }),
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

export const performPost = async (employee, workTimeData) => {
    try {
        // This is so stupid but it works. 
        const workInterval = durationToPostgresInterval(moment.duration(workTimeData[0].sum));
        const response = await fetch('/api/workIntervals/setBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workInterval, employee }),
        });
        if (!response.ok) {
            throw new Error('Failed to post balance to database');
        }
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
};