// Author Thomas
import React, { useState } from 'react';
import styles from './clockInOutButton.module.css';

interface ClockInOutButtonProps {
    employeeId: number;
    onClockInOut: (employeeId: number, isClockedIn: boolean) => void;
    isClockedIn: boolean;
}

const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employeeId, onClockInOut, isClockedIn }) => {
    const handleClockInOut = () => {
    onClockInOut(employeeId, !isClockedIn);
};

return (
    <button onClick={handleClockInOut}
      className={`${styles.button} ${isClockedIn ? styles.clockOut : styles.clockIn}`}>
        {isClockedIn ? 'Clock Out' : 'Clock In'}
    </button>
    );
};

export default ClockInOutButton;