/* 
    Author: Thomas H
    API call to perform check-in operation on employee.
*/
export const clockIn = async (employee, balance, currentTime) => {
    if (employee.isClockedIn)
        return Promise.reject(new TypeError(employee.name + ' er ikke utstemplet!'));
    try {
        const response = await fetch('/api/clockOperation/clockIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, currentTime}),
        });
        if (!response.ok) {
            throw new Error('Feil ved utstempling!');
        }
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        console.error('Error performing check operation:', error);
        throw error;
    }
};