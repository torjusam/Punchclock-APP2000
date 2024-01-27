// Author: Thomas, Torjus A.M
// MÅ OPPDATERES MED SELECT METODE OG STATUS FOR CLOCKED IN ELLER IKKE
// employeeTable.tsx
import React from 'react';
import { EmployeeShiftInfo } from '../../lib/definitions';

interface EmployeeDataProps {
  employee: EmployeeShiftInfo;
}

interface EmployeeListDisplayProps {
  employeeShiftInfo: EmployeeShiftInfo[];
  onSelectEmployee: (id: number) => void;
  RowComponent: React.FC<{ employee: EmployeeShiftInfo; onSelectEmployee: (id: number) => void }>;
}

export const EmployeeData: React.FC<EmployeeDataProps> = ({ employee }) => {
  return (
    <div className="employeeListContainer">
      <div className="profileContainer">
        <div className="profilePicture"></div>
      </div>
      <div className="infoContainer">
        <span className="employeeName">{employee.employee.first_name} {employee.employee.surname}</span>
      </div>
    </div>
  );
};

const EmployeeListDisplay: React.FC<EmployeeListDisplayProps> = ({ employeeShiftInfo, onSelectEmployee, RowComponent }) => {
  return (
    <div className="employeeList">
      {employeeShiftInfo.map(employee => (
        <RowComponent key={employee.employee.id} employee={employee} onSelectEmployee={onSelectEmployee} />
      ))}
    </div>
  );
};

export default EmployeeListDisplay;
