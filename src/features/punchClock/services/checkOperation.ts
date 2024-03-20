/* 
    Author: Torjus A.M
    Various functions for performing check operations on employees.
*/
import { checkOutEmployee } from "./performCheckOut";

// Helper function that updates the status of the employee in the employees array. Returns an updated array. (force a re-render).
const updateEmployeeStatus = (employees, employee) => {
    return employees.map(emp => {
        if (emp.id !== employee.id) {
            return emp;
        }
        return {
            ...emp,
            isClockedIn: !employee.isClockedIn,
            lastCheckIn: employee.isClockedIn ? emp.lastCheckIn : new Date(),
            lastCheckOut: employee.isClockedIn ? new Date() : emp.lastCheckOut,
        };
    });
};
// API call to perform check-in operation on employee.
const performCheckInOperation = async (employee, currentTime) => {
    const response = await fetch('/api/checkIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee, currentTime }),
    });
    if (!response.ok) {
        throw new Error('Failed to perform check operation');
    }
};

export const checkOperation = async (employee, employees, setEmployees, workTimeData) => {
    try {
        if (employee) {
            if (employee.isClockedIn) {
                await checkOutEmployee(employee, workTimeData);
            } else {
                const currentTime = new Date();
                await performCheckInOperation(employee, currentTime);
            }
            const updatedEmployees = updateEmployeeStatus(employees, employee);
            setEmployees(updatedEmployees);
        } else {
            throw new Error('Employee not found');
        }
    } catch (error) {
        console.error('Error performing check operation:', error);
        throw error;
    }
};