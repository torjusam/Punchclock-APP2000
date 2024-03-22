/*  
    Author: Torjus A.M
    Defines the layout of the personalPage, and exports it.
    Responsible for wrapping data on the page with context providers.
*/
import React, { FC } from 'react';
import { Employee } from '../../lib/employee';
import styles from './employeePageLayout.module.css';
import EmployeePageNav from '../layout/navbar/employeePageNav';
import PunchClock from '../../features/clock-operation';
import TimerProvider from '../../context/timerContext';
import WorkIntervalProvider from '../../context/workIntervalContext';
import ShiftList from './shiftList';
import ClockHistory from '../../features/clockHistory';

interface employeePageProps {
  employee: Employee;
}

/*
  Employee prop passed to this component is the selected employee from the list of employees on the homepage.
  This prop is then passed down to the children components and their children, which are responsible for displaying and 
  performing operations on the data that uses values from the employee object.
*/
const EmployeePageData: FC<employeePageProps> = ({ employee }) => {

  return (
    <div className={styles.personalPageContainer}>
      <EmployeePageNav employee={employee} />
      {/* Wraps two custom context providers around the modules. 
      Provides the state for the current timer for this shift, and the employees worktime-balance */}
      <WorkIntervalProvider employee={employee}>
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