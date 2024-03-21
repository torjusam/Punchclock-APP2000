/*  
    Author: Torjus A.M
    Defines the layout of the personalPage, and exports it.
*/
import React, { useState, useEffect } from 'react';
import { Employee } from '../../lib/employee';
import styles from './employeePageLayout.module.css';
import EmployeePageNav from '../layout/navbar/employeePageNav';
import PunchClock from '../../features/clock-operation';
import TimerProvider, { useTimerContext } from '../../context/timerContext';
import WorkIntervalProvider from '../../context/workIntervalContext';
import ShiftList from './shiftList';
import ClockHistory from '../../features/clockHistory';

interface employeePageProps {
  employee: Employee;
}

const EmployeePageData: React.FC<employeePageProps> = ({ employee }) => {

  return (
    <div className={styles.personalPageContainer}>
      <EmployeePageNav employee={employee} />
      <WorkIntervalProvider employee={employee}>
        {/* Wrap the modules with the shared state of the timer (punchclock-timer must always match the latest row) */}
        <TimerProvider>
          <div className={styles.personalPage}>
            <div className={styles.outerModuleContainer}>
              <PunchClock employee={employee} />
              <ShiftList employee={employee} />
            </div>
            <ClockHistory employee={employee} />
          </div>
        </TimerProvider>
      </WorkIntervalProvider>
    </div>
  );
}

export default EmployeePageData;