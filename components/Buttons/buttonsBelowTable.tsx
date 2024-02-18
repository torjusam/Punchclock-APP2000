// Author: Torjus A.M
// Buttons below the employee table. Contains a clock in/out button and a button to redirect to the personal page of the selected employee
import React from 'react';
import ClockInOutButton from './clockInOutButton';
import GoToPersonalPageButton from './redirectToPageButton';
import Container from '../../lib/styles/flexContainers.module.css';
import styles from '../../lib/styles/Buttons.module.css';
import { Employee } from '../../lib/employee';

interface ButtonsProps {
  selectedEmployee: Employee | null;
}

const ButtonsBelowTable: React.FC<ButtonsProps> = ({ selectedEmployee }) => {
  // Styled conditonally
  return (
    <div className={Container.buttonContainer}>
      <div className={`${styles.button} ${selectedEmployee ? styles.selected : styles.disabled}`}>
        <ClockInOutButton
          employee={selectedEmployee}
          isClockedIn={selectedEmployee?.isClockedIn || false} 
        />
      </div>
      <div className={`${styles.button} ${selectedEmployee ? styles.selected : styles.disabled}`}>
        <GoToPersonalPageButton employeeId={selectedEmployee?.id} />
      </div>
    </div>
  );
}

export default ButtonsBelowTable;