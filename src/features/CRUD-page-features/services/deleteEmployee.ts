// Author: Torjus A.M
import Employee from "../../../lib/types/employee";

export const deleteEmployee = async (employee: Employee) => {
    const employeeId = employee.id;
    const response = await fetch('/api/crudExtra/deleteEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({employeeId}),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw Error(response.statusText);
    }
};