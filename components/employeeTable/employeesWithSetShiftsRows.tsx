//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { EmployeeShiftInfo } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import DataAccess from '../../lib/dataAcess';

const EmployeeShiftRows: React.FC = () => {
  const [employeeShiftInfo, setEmployeeShiftInfo] = useState<EmployeeShiftInfo[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      //kaller metoden for å hente og filtrere dataen
      const result = await DataAccess.fetchEsWithSetShiftsData();
      setEmployeeShiftInfo(result);
    };

    fetchData();
  }, []);

  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);
    setIsClockedIn(employeeShiftInfo.some(emp => emp.employee.id === id && emp.employee.isClockedIn));
  };

  const clockInOut = (employeeId: number, clockedIn: boolean) => {
    console.log(`Employee ID: ${employeeId}, Clocked In Status: ${clockedIn}`);
    setIsClockedIn(!clockedIn);
  };

  const showClockButton = true;

  console.log("Employee Shift Info:", employeeShiftInfo);

  return (
    <div className="EmployeeShiftTable">
      {employeeShiftInfo && employeeShiftInfo.length > 0 ? (
        <>
          <EmployeeListDisplay
            employeeShiftInfo={employeeShiftInfo}
            onSelectEmployee={handleSelectedEmployee}
          />

          {showClockButton && selectedEmployeeId && (
            <ClockInOutButton
              employeeId={selectedEmployeeId}
              onClockInOut={clockInOut}
              isClockedIn={isClockedIn}
            />
          )}
        </>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeShiftRows;