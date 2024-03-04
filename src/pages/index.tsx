// Author: Torjus A.M,
import React from 'react';
import EmployeeListDisplay from '../components/frontPageTable/employeeTable';
import NavContainer from '../components/Navs/navContainer';
import styles from '../styles/flexContainers.module.css'

export default function Page() {
  return (
    <div className={styles.generalContainer}>
      <NavContainer />
      <EmployeeListDisplay />
    </div>
  );
}