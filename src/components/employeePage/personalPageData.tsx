// Author: Torjus A.M
import React, { useState, useEffect } from 'react';
import { Employee } from '../../lib/employee';
import LastCheckTime from '../frontPageTable/lastCheckTime';
import styles from './square.module.css';
import ClockInOutButton from '../Buttons/clockInOutButton';

interface personalProps {
  employee: Employee;
}

const PersonalPageData: React.FC<personalProps> = ({ employee }) => {

  return (
    <>
      <div className={styles.headerContainer}>
        <img className={styles.profilePicture} src='stockAvatar.png' alt={`Profile of ${employee.name}`}></img>
        <div className={styles.todayTimeInfo}>
          <h2 className={styles.h1}>I dag</h2>
          <h2 className={styles.h2}>00t 00m 00s</h2> {/* Create function for employee time and format it */}
        </div>
      </div>
      <div className={styles.lineContainer}>
        <hr className={styles.line} />
        <h3 className={styles.h3}>Ingen vakt i dag</h3> {/* Create function for employee shift */}
      </div>
      <div className={styles.bigButton}>
        <ClockInOutButton employee={employee} />
      </div>
      <LastCheckTime employee={employee} />
    </>
  );
}

export default PersonalPageData