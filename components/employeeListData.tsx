// Author: Thomas
import React from 'react';
import styles from './employeeListData.module.css';
import { EmployeeShiftInfo } from '../lib/definitions';

/* Using props from EmployeeShiftInfo */
interface EmployeeDataProps {
  employee: EmployeeShiftInfo;
}

interface EmployeeListDisplayProps {
  employeeShiftInfo: EmployeeShiftInfo[];
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

const EmployeeListDisplay: React.FC<EmployeeListDisplayProps> = ({employeeShiftInfo}) => {
  return (
    <div className={styles.employeeList}>
      {employeeShiftInfo.map((employee, index) => (
        <EmployeeData
        key={index}
        employee={employee}
        />
        ))}
    </div>
  );
};

export default EmployeeListDisplay;