// Author: Torjus A.M
// Flytta knappene som skal være under tabellen til en annen klasse
import React from 'react';
import ClockInOutButton from '../ClockInOutButton';
import GoToPersonalPageButton from '../redirectToPageButton';
import Link from 'next/link';

interface ButtonsProps {
  selectedEmployeeId: number | null;
  isClockedIn: boolean;
  onClockInOut: (employeeId: number, clockedIn: boolean) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ selectedEmployeeId, isClockedIn, onClockInOut }) => {
  return (
    selectedEmployeeId && (
      <div>
        <ClockInOutButton
          employeeId={selectedEmployeeId}
          onClockInOut={onClockInOut}
          isClockedIn={isClockedIn}
        />
        <Link href={`/${selectedEmployeeId}`}>
          <GoToPersonalPageButton employeeId={selectedEmployeeId} />
        </Link>
      </div>
    )
  );
}

export default Buttons;