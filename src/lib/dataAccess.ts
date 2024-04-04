// Author: Torjus A.M
//TODO: change name (and location?)
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