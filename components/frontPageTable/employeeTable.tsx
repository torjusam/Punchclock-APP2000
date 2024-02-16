// Author: Thomas, Torjus A.M
// MÅ OPPDATERES MED SELECT METODE OG STATUS FOR CLOCKED IN ELLER IKKE
import React from 'react';
import { Employee } from '../../lib/employee';
import styles from '../../lib/styles/employeeListData.module.css';

interface EmployeeDataProps {
  employee: Employee;
  onSelect: () => void;
  isSelected: boolean;
}

//component represetning individual employee within the list
export const EmployeeData: React.FC<EmployeeDataProps> = ({ employee, onSelect, isSelected }) => {
  return (
    <div className={`${styles.employeeListContainer} ${isSelected ? styles.selected : ''}`} onClick={onSelect}>
      <div className={styles.profileContainer}>
        <div className={styles.circle}></div>
        <img className={styles.profilePicture} src='stockAvatar.png' alt={`Profile of ${employee.first_name} ${employee.surname}`}></img>
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

//responsible for displaying list; each employee is represented by employeeData component
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
