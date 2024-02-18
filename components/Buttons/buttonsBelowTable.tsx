// Author: Torjus A.M
// Flytta knappene som skal være under tabellen til en annen klasse
import React from 'react';
import ClockInOutButton from './clockInOutButton';
import GoToPersonalPageButton from './redirectToPageButton';
import Link from 'next/link';
import Container from '../../lib/styles/flexContainers.module.css';
import { Employee } from '../../lib/employee';

interface ButtonsProps {
  selectedEmployee: Employee | null
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>
}

const ButtonsBelowTable: React.FC<ButtonsProps> = ({ selectedEmployee, setSelectedEmployee }) => {
  if (!selectedEmployee) {
    return  <div className={Container.buttonContainer}></div>;
  }

  return (
    <div className={Container.buttonContainer}>
      <ClockInOutButton
        employee={selectedEmployee}
        isClockedIn={selectedEmployee.isClockedIn}
        setSelectedEmployee={setSelectedEmployee}
      />
      <GoToPersonalPageButton employeeId={selectedEmployee.id} />
    </div>
  );
}

export default ButtonsBelowTable;