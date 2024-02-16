//Author: Torjus A.M
import { Employee } from './employee';

// Fetches list of employees from api handler and returns a Employee array
export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('/api/getEmployees');
    if (response.ok) {
      // Result expected to return as: ID, First_name, Surname, Last_checkin, Last_checkout
      const result = await response.json();
      return result.map((row: any) => {
        return new Employee(row.id, row.first_name, row.surname, row.last_checkin, row.last_checkout);
      });
      // Error: return empty employee-array 
    } else {
      console.error('Error:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}

// Checks employee in / out based on isClockedIn status
export async function performCheckOperation(employeeId: number, isClockedIn: boolean): Promise<string> {
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
      return isClockedIn ? 'Successfully checked out' : 'Successfully checked in';
    } else {
      console.error('Error:', response.status);
      return 'Failed to perform check operation';
    }
  } catch (error) {
    console.error('Error performing check operation:', error);
    return 'Error performing check operation';
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
      body: JSON.stringify({ firstName, lastName }),
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
      body: JSON.stringify({ employeeId: employeeId_param }),
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