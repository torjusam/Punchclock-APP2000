//Forfatter: Torjus A.M
//data access klasse: alle database-interaksjoner går gjennom denne klassen.
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  Employee,
  Shift,
  Checkin_Checkout,
  Shift_employee,
  EmployeeShiftInfo
} from './definitions';

export async function fetchEmployeesWithSetShifts(): Promise<EmployeeShiftInfo[]> {
  noStore();
  try {
    const employeeWithSetShifts = sql`
      SELECT e.First_name, e.Surname, s.Start, s.End
      FROM employee AS e
      JOIN shift_employee AS se ON e.id = se.Employee_id
      JOIN shift AS s ON s.id = se.Shift_id;`;

   const [employeeSetShiftList] = await Promise.all([employeeWithSetShifts])
    //forventer at data er i riktig struktur
    return employeeSetShiftList.rows as EmployeeShiftInfo[];
  } catch(error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees with set shifts");
  }
}

