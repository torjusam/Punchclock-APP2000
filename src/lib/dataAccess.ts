// Author: Torjus A.M
import {Employee} from './types/employee';

// Fetches list of employees from api handler and returns a Employee array
export async function fetchEmployees(): Promise<Employee[]> {
    try {
        const response = await fetch('/api/getEmployees');
        if (response.ok) {
            const result = await response.json();
            // Maps over json to create employee objects with the results from api
            return result.map((row: any) => {
                return new Employee(
                    row.id,
                    row.name,
                    row.plannedwork,
                    row.pin,
                    row.profilepictureurl,
                    row.lastcheckin,
                    row.lastcheckout
                );
            });
        } else {
            console.error('Error:', response.status);
            throw {status: response.status, message: response.statusText};
        }
    } catch (error) {
        throw error;
    }
}

// Placeholder for prototype (Returns string with result for testing)
export async function createEmployee(firstName: string, lastName: string): Promise<string> {
    try {
        const response = await fetch('/api/insertEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName, lastName}),
        });

        if (response.ok) {
            return `Successfully created employee: ${firstName} ${lastName}`;
        } else {
            console.error('Error:', response.status);
            return `Failed to create employee: ${firstName} ${lastName}`;
        }
    } catch (error) {
        console.error('Error calling createEmployee API:', error);
        return 'Error calling createEmployee API';
    }
}

export async function deleteEmployee(employeeId_param: number): Promise<string> {
    try {
        const response = await fetch('/api/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employeeId: employeeId_param}),
        });
        if (response.ok) {
            return 'Successfully deleted employee';
        } else {
            console.error('Error:', response.status);
            return 'Failed to delete employee';
        }
    } catch (error) {
        console.error('Error calling deleteEmployee API:', error);
        return 'Error calling deleteEmployee API';
    }
}