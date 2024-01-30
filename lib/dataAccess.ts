//Author: Torjus A.M
import {Employee } from './definitions';
import { EmployeeList } from './employeeStorage';

//fetches all employees, and stores in an array of type Employee
export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch('/api/getEmployees');
    if (response.ok) {
      const result = await response.json();
      return result.map((row: any) => {
        return {
          id: row.id,
          first_name: row.first_name,
          surname: row.surname,
        };
      });
    } else {
      console.error('Error:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}
//fetches and formats employees with upcoming shifts
export async function fetchEmployeesWithSetShiftsData(): Promise<Employee[]> {
  try {
    const response = await fetch('/api/getEsWithSetShifts');
    if (response.ok) {
      const result = await response.json();
      return result.map((row: any) => {
        return {
          id: row.id,
          first_name: row.first_name,
          surname: row.surname,
          shiftStart: new Date(row.start),
          shiftEnd: new Date(row.end),
        };
      });
    } else {
      console.error('Error:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
}


export async function performCheckOperation(employeeId_param: number, isCheckIn: boolean): Promise<void> {
  try {
    const endpoint = isCheckIn ? '/api/checkIn' : '/api/checkOut';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId_param }),
    });

    if (response.ok) {
      // update the employeeList
      EmployeeList.updateEmployeeStatus(employeeId_param, isCheckIn);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error(`Error calling setCheck${isCheckIn ? 'In' : 'Out'} API:`, error);
  }
}

//Placeholder for prototype
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
