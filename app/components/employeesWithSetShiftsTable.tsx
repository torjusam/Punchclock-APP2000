// Author: Torjus A.M
'use client';
import React, { useEffect, useState } from 'react';
import { EmployeeShiftInfo } from '../lib/definitions';
import { formatDateTime } from '../lib/dateUtils';

const EmployeeShiftTable: React.FC = () => {
  const [employeeShiftInfo, setEmployeeShiftInfo] = useState<EmployeeShiftInfo[]>([]);
  //fetches the data from the query in the api folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../lib/api/getEmployeesWithSetShifts');
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setEmployeeShiftInfo(result.data); // update state
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // empty dependency array ensures the effect runs only once after the initial render

  // filter employees where curdate is lower than the shiftStart
  const filteredEmployees = employeeShiftInfo.filter(
    (employee) => new Date() < new Date(employee.shiftStart)
  );
  console.log(filteredEmployees);

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
                <td>{formatDateTime(new Date(employee.shiftStart))}</td>
                <td>{formatDateTime(new Date(employee.shiftEnd))}</td>
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
