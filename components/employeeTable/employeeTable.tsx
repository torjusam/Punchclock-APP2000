// Author: Thomas
// MÅ OPPDATERES MED SELECT METODE OG STATUS FOR CLOCKED IN ELLER IKKE
import React from 'react';
import styles from '../lib/styles/employeeListData.module.css';
import { EmployeeShiftInfo } from '../../lib/definitions';

/* Using props from EmployeeShiftInfo */
interface EmployeeDataProps {
  employee: EmployeeShiftInfo;
}

interface EmployeeListDisplayProps {
  employeeShiftInfo: EmployeeShiftInfo[];
  onSelectEmployee: (id: number) => void;
}

const EmployeeData: React.FC<EmployeeDataProps> = ({ employee }) => {
  return (
    <div className={styles.employeeListContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicture}></div>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.employeeName}>{employee.firstName} {employee.lastName}</span>
      </div>
    </div>    
  );
};

const EmployeeListDisplay: React.FC<EmployeeListDisplayProps> = ({employeeShiftInfo, onSelectEmployee}) => {
  return (
    <div className={styles.employeeList}>
      {employeeShiftInfo.map(employee => ( 
        <div
         key={employee.id}
         className={styles.employeeItem}
         onClick={() => onSelectEmployee(employee.id)}
        >
        <EmployeeData employee={employee}/>
        </div> 
        ))}
    </div>
  );
};

export default EmployeeListDisplay;