// Author: Torjus A.M,
import React from 'react';
import EmployeeShiftList from '../components/frontPageTable/employeeShiftList';
import NavContainer from '../components/Navs/navContainer';
import styles from '../styles/flexContainers.module.css'

export default function Page() {
  return (
    <div className={styles.generalContainer}>
      <NavContainer />
      <EmployeeShiftList />
    </div>
  );
}