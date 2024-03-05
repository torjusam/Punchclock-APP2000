/* 
    Author: Torjus A.M
    Custom hook for updating performing the check operation for an employee.
    Also updates the employees status in the global state array.
*/
import { useState, useEffect } from 'react';
import { useEmployeeContext } from './employeeContext';

export const useCheckOperation = (employeeId: number, isClockedIn: boolean) => {
    const { employees, setEmployees } = useEmployeeContext();
    const [status, setStatus] = useState('');

    useEffect(() => {
        const performCheckOperation = async () => {
          try {
            const endpoint = isClockedIn ? '/api/checkOut' : '/api/checkIn';
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ employeeId: employeeId }),
            });
      
            if (response.ok) {
              setStatus(isClockedIn ? 'Successfully checked out' : 'Successfully checked in');
      
              // Find the index of the employee in the global state array
              const index = employees.findIndex(emp => emp.id === employeeId);
              employees[index].isClockedIn = !isClockedIn;
      
              // Update the employee's last check in/out time
              if (isClockedIn) {
                employees[index].lastCheckOut = new Date();
              } else {
                employees[index].lastCheckIn = new Date();
              }
              // Update global state with new array
              setEmployees([...employees]);
            } else {
              console.error('Error:', response.status);
              setStatus('Failed to perform check operation');
            }
          } catch (error) {
            console.error('Error performing check operation:', error);
            setStatus('Error performing check operation');
          }
        };
      
        performCheckOperation();
      }, [employeeId, isClockedIn]);

    return status;
};