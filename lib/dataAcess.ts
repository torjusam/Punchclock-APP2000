// Author: Torjus A.M
import { EmployeeShiftInfo, EmployeeCheckInInfo } from './definitions';

class DataAccess {
  static async fetchEsWithSetShiftsData(): Promise<EmployeeShiftInfo[]> {
    try {
      const response = await fetch('/api/getEsWithSetShifts');
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Error:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data', error);
      return [];
    }
  }

  static async setCheckIn(employeeId: number): Promise<EmployeeCheckInInfo[]> {
    try {
      const response = await fetch('api/checkIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId }),
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('Error:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data', error);
      return [];
    }
  }
}

export default DataAccess;
