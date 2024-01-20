//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../dbIndex';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    const result = await client.query(`
    BEGIN TRANSACTION;

    INSERT INTO shift (description, shiftStart, shiftEnd)
    VALUES ('Day Shift', '2024-01-20 08:00:00', '2024-01-20 16:00:00');

    -- get ID of the last inserted Shift
    DECLARE @shiftId INT;
    SET @shiftId = SCOPE_IDENTITY();

    INSERT INTO employee (first_name, surname)
    VALUES ('John', 'Doe');

    DECLARE @employeeId INT;
    SET @employeeId = SCOPE_IDENTITY();

    -- insert data into the join table 
    INSERT INTO shift_employee (shift_id, employee_id)
    VALUES (@shiftId, @employeeId);
    
    COMMIT;
  `);
    const data = result.rows;
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
