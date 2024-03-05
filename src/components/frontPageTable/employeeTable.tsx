/*
  Author: Thomas H, Torjus A.M
  This component is displays the employee-cards in a table on the frontpage.
  It uses the custom employeeContext hook to access the array of employees,
  then maps over it and assigns each to an employee card.
*/
import React, { FC } from 'react';
import EmployeeCard from './employeeCard';
import { useEmployeeContext } from '../../hooks/employeeContext';
import styles from './employeeList.module.css';

const EmployeeListDisplay: FC = () => {
  const { sortedEmployees } = useEmployeeContext();

  return (
    <div className={styles.EmployeeList}>
      {sortedEmployees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
        />
      ))}
    </div>
  );
};

export default EmployeeListDisplay;
