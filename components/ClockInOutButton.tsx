// Author: Thomas H
import React from 'react';
import styles from '../lib/styles/ClockInOutButton.module.css';
import { Employee } from '../lib/definitions';

interface ClockInOutButtonProps {
  selectedEmployee: Employee;
  onClockInOut: (selectedEmployee: Employee) => void;
}

const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ selectedEmployee, onClockInOut }) => {
  const handleClockInOut = () => {
    onClockInOut(selectedEmployee);
  };

  return (
    <button
      onClick={handleClockInOut}
      className={`${styles.button} ${selectedEmployee.isClockedIn ? styles.clockOut : styles.clockIn}`}
    >
      {selectedEmployee.isClockedIn ? 'Clock Out' : 'Clock In'}
    </button>
  );
};

export default ClockInOutButton;
