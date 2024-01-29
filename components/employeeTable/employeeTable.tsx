// Author: Thomas, Torjus A.M
// MÅ OPPDATERES MED SELECT METODE OG STATUS FOR CLOCKED IN ELLER IKKE
// employeeTable.tsx
import React from 'react';
import { Employee } from '../../lib/definitions';

interface EmployeeDataProps {
  employee: Employee;
  onSelect: () => void;
}


export const EmployeeData: React.FC<EmployeeDataProps> = ({ employee, onSelect }) => {
  return (
    <div className="employeeListContainer" onClick={onSelect}>
      <div className="profileContainer">
        <div className="profilePicture"></div>
      </div>
      <div className="infoContainer">
        <span className="employeeName">{employee.first_name} {employee.surname}</span>
      </div>
    </div>
  );
};

interface EmployeeListDisplayProps {
  employeeShiftInfo: Employee[];
  onSelectEmployee: (id: number) => void;
}

const EmployeeListDisplay: React.FC<EmployeeListDisplayProps> = ({ employeeShiftInfo, onSelectEmployee }) => {
  const scheduledWorkers = employeeShiftInfo.filter(employee => employee.shiftStart);
  const nonScheduledWorkers = employeeShiftInfo.filter(employee => !employee.shiftStart);
  return (
    <div>
      <div className="scheduledWorkersList">
        {scheduledWorkers.map(employee => (
          <EmployeeData key={employee.id} employee={employee} onSelect={() => onSelectEmployee(employee.id)} />
        ))}
    </div>
      <div className="nonScheduledWorkers">
        {nonScheduledWorkers.map(employee => (
          <EmployeeData key={employee.id} employee={employee} onSelect={() => onSelectEmployee(employee.id)} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeListDisplay;
