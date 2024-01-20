//Author: Torjus A.M
import React from 'react';
import { EmployeeShiftInfo } from '../lib/definitions';
import { formatDateTime } from '../lib/dateUtils';

const EmployeeShiftTable: React.FC = () => {
  const employeeShiftInfo: EmployeeShiftInfo[] = [
    {
      firstName: 'Jonas',
      lastName: 'Bongo',
      shiftStart: new Date('2024-02-15T00:00:00'),
      shiftEnd: new Date('2024-02-15T08:00:00'),
    },
    // more entries
  ];

  // filter employees where curdate is lower than the shiftStart
  const filteredEmployees = employeeShiftInfo.filter(
    (employee) => new Date() < employee.shiftStart
  );

  return (
    <div className="EmployeeShiftTable">
      {filteredEmployees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start of shift</th>
              <th>End of shift</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{formatDateTime(employee.shiftStart)}</td>
                <td>{formatDateTime(employee.shiftEnd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeShiftTable;
