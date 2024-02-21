// Author: Torjus A.M
// Buttons below the employee table. Contains a clock in/out button and a button to redirect to the personal page of the selected employee
import React from 'react';
import ClockInOutButton from './clockInOutButton';
import GoToPersonalPageButton from './redirectToPageButton';
import Container from '../../lib/styles/flexContainers.module.css';
import { Employee } from '../../lib/employee';

interface ButtonsProps {
  selectedEmployee: Employee | null;
}

const ButtonsBelowTable: React.FC<ButtonsProps> = ({ selectedEmployee }) => {

  return (
    <div className={Container.buttonContainer}>
        <ClockInOutButton employee={selectedEmployee} />
        <GoToPersonalPageButton employee={selectedEmployee} />
    </div>
  );
}

export default ButtonsBelowTable;