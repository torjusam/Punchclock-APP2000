// Author: Thomas H
import React, { useState } from 'react';
import styles from '../../lib/styles/Buttons.module.css';
import { Employee } from '../../lib/employee';

interface ClockInOutButtonProps {
    employeeId: number;
    onClockInOut: (employee: Employee, isClockedIn: boolean) => void;
    isClockedIn: boolean;
}

const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employeeId, onClockInOut, isClockedIn }) => {
    const handleClockInOut = () => {
    onClockInOut(employee, !isClockedIn);
};

return (
    <button onClick={handleClockInOut}
      className={`${styles.button} ${isClockedIn ? styles.clockOut : styles.clockIn}`}>
        {isClockedIn ? 'Clock Out' : 'Clock In'}
    </button>
    );
};

export default ClockInOutButton;
