/*
    Author: Torjus A.M
    Fetches all the employees from the database and returns a list of Employee objects.
*/
import {Employee} from '../../../lib/types/employee';

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
            throw {status: response.status, message: response.statusText};
        }
    } catch (error) {
        throw error;
    }
}