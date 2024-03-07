// Author: Torjus A.M
import React, { useState, useEffect } from 'react';
import { Employee } from '../../lib/employee';
import styles from './personalPage.module.css';
import PunchClock from './punchClock';
import ShiftList from './shiftList';
import ClockHistory from './clockHistory/clockHistory';

interface employeePageProps {
  employee: Employee;
}

const EmployeePageData: React.FC<employeePageProps> = ({ employee }) => {

  return (
    <div className={styles.personalPage}>
      <div className={styles.outerModuleContainer}>
        <PunchClock employee={employee} />
        <ShiftList employee={employee} />
      </div>
      <ClockHistory employee={employee} />
    </div>
  );
}

export default EmployeePageData;