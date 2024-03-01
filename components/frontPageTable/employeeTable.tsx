// Author: Thomas, Torjus A.M
import React from 'react';
import { Employee } from '../../lib/employee';
import styles from './employeeList.module.css';

interface EmployeeDataProps {
  employee: Employee;
  onSelect: () => void;
  isSelected: boolean;
}

// Component represetning individual employee within the list
// To-Do: Replace avatar with employees avatar
export const EmployeeData: React.FC<EmployeeDataProps> = ({ employee, onSelect, isSelected }) => {
  const avatar = employee.profilePictureUrl ? employee.profilePictureUrl : './avatar.svg';

  return (
    <div className={`${styles.employeeListContainer} ${employee.isClockedIn ? styles.isClockedIn : ''} ${isSelected ? styles.selected : ''}` } onClick={onSelect}>
      <div className={styles.profileContainer}>
        <img className={styles.profilePicture} src={avatar} />
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.employeeName}>{employee.first_name} {employee.surname}</span>
      </div>
    </div>
  );
};

interface EmployeeListDisplayProps {
  employeeShiftInfo: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  selectedEmployee: Employee | null;
}

// Responsible for displaying list; each employee is represented by employeeData component
const EmployeeListDisplay: React.FC<EmployeeListDisplayProps> = ({ employeeShiftInfo, onSelectEmployee, selectedEmployee }) => {
  return (
    <div className={styles.EmployeeList}>
      {employeeShiftInfo.map(employee => (
        <EmployeeData
          key={employee.id}
          employee={employee}
          onSelect={() => onSelectEmployee(employee)}
          isSelected={employee === selectedEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeListDisplay;
