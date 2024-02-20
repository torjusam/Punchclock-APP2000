// Author: Torjus A.M  
import React from 'react';
import styles from '../../lib/styles/square.module.css'
import { Employee } from '../../lib/employee';
import PersonalPageData from './personalPageData';

// Either gonna display personal page, PIN-code or CRUD-test page
interface SquareProps {
  employee: Employee;
}

const Square: React.FC<SquareProps> = ({ employee, }) => {
  return (
    <div className={styles.squareOuterContainer}>
      <div className={styles.square}>
        <PersonalPageData employee={employee} />
      </div>
    </div>
  );
};

export default Square;