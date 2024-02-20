// Author: Torjus A.M
// Data on the personal page for employees, placed on the square component.
import React from 'react';
import styles from '../../lib/styles/square.module.css';
import { Employee } from '../../lib/employee';

interface personalProps {
  employee: Employee;
}

const PersonalPageData: React.FC<personalProps> = ({ employee }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <img className={styles.profilePicture} src='stockAvatar.png' alt={`Profile of ${employee.first_name} ${employee.surname}`}></img>
        <h1 className={styles.h1}>{employee.first_name + " " + employee.surname}</h1>
      </div>
      <div className={styles.todayTimeInfo}>
        <h2 className={styles.h1}>I dag</h2>
        <h2 className={styles.h2}>00t 00m</h2>
      </div>
      <div className={styles.infoContainer}>
        <hr className={styles.line} />
      </div>
    </>
  );
}

export default PersonalPageData