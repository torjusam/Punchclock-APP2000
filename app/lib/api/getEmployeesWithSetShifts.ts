//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../dbIndex';
import { EmployeeShiftInfo } from '../definitions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Request to /api/getEmployeesWithSetShifts received');
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        e.First_name, e.Surname,
        s.Start,s.End
      FROM employee AS e
      JOIN shift_employee AS se ON e.id = se.Employee_id
      JOIN shift AS s ON s.id = se.Shift_id;
  `);
    const data: EmployeeShiftInfo[] = result.rows;
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
