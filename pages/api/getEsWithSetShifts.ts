//Auhor: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'
import { EmployeeShiftInfo } from '../../lib/definitions';

const transformSetShiftData = (data: any[]): EmployeeShiftInfo[] => {
    return data.map((emp: any) => ({
      first_name: emp.first_name,
      surname: emp.surname,
      shiftStart: new Date(emp.start),
      shiftEnd: new Date(emp.end),
    })) as EmployeeShiftInfo[];
  };

  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query(
            'SELECT e.First_name, e.Surname, s.Start, s.End ' +
            'FROM Employee AS e ' +
            'JOIN shift_employee AS se ON e.id = se.Employee_id ' +
            'JOIN shift AS s ON s.id = se.Shift_id',
            []
        );
         const transformedData = transformSetShiftData(result.rows);
        res.status(200).json(transformedData);
    } catch (error) {
      console.error('Error fetching and transforming data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
