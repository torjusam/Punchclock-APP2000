// Author: Torjus A.M
import React, { useState, useEffect } from 'react';
import { Employee } from '../../lib/employee';
import LastCheckTime from '../frontPageTable/lastCheckTime';
import styles from './personalPage.module.css';
import PunchClock from './punchClock';
import ShiftList from './shiftList';

interface personalProps {
  employee: Employee;
}

const PersonalPageData: React.FC<personalProps> = ({ employee }) => {

  return (
    <div className={styles.personalPage}>
      <div className={styles.moduleContainer}>
        <PunchClock employee={employee} />
        <ShiftList employee={employee} />
      </div>
      <div className={styles.clockHistory}>
        <h1>Stemplingshistorikk</h1>
      </div>
    </div>
  );
}

export default PersonalPageData