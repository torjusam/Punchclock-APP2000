/* 
    Author: Torjus A.M
    API call to perform check-in operation on employee.
*/

export const clockIn = async (employee, workTimeData) => {
    try {
        const response = await fetch('/api/checkIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee, workTimeData }),
        });
        if (!response.ok) {
            throw new Error('Failed to perform check operation');
        }
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        console.error('Error performing check operation:', error);
        throw error;
    }
};