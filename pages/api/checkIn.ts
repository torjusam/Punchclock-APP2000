//Auhor: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'
import {EmployeeCheckInInfo } from '../../lib/definitions';

const transformCheckInData = (data: any[]): EmployeeCheckInInfo[] => {
    return data.map((emp: any) => ({
      id: emp.id,
      employee_id: emp.Employee_ID,
      checkIn: new Date(emp.Checkin_Timestamp),
    })) as EmployeeCheckInInfo[];
  };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employeeId } = req.body; // Adjust this based on your actual request structure
        const checkinTimestamp = new Date(); // Use the current date as Checkin_Timestamp
         
        const text = 'INSERT INTO CheckIn_CheckOut (Employee_ID, Checkin_Timestamp) VALUES ($1, $2) RETURNING *';

        const values = [employeeId, checkinTimestamp];

        const result = await pool.query(text, values);

        const transformedData = transformCheckInData(result.rows);
        res.status(200).json(transformedData);
    } catch (error) {
        console.error('Error inserting check-in data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

