// Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { EmployeeShiftInfo } from '../../lib/definitions';
import EmployeeListDisplay from './employeeListData';
import ClockInOutButton from '../ClockInOutButton';

//component to fetch and render result of api call
const EmployeeShiftTable: React.FC = () => {
  const [employeeShiftInfo, setEmployeeShiftInfo] = useState<EmployeeShiftInfo[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //HTTP GET request
        const response = await fetch('/api/getEsWithSetShifts');
        if (response.ok) {
          const result = await response.json();
          const sortedData = result.map((emp: { id: number, first_name: any; surname: any; start: string | number | Date; end: string | number | Date; }) => ({
            id: emp.id,
            firstName: emp.first_name,
            lastName: emp.surname,
            shiftStart: new Date(emp.start),
            shiftEnd: new Date(emp.end),
            isClockedIn: false // ideén er at denne skal hente status fra API eventuelt
          }));
          setEmployeeShiftInfo(sortedData);
        } else {
          console.error('Error:', response.status);  
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSelectedEmployee = (id: number) => {
    // placeholder logikk
    setSelectedEmployeeId(id);
    // placeholderlogikk for hente clocked status
    setIsClockedIn(employeeShiftInfo.some(emp => emp.id === id && emp.isClockedIn));
  };

  // update this når api er oppdatert
  const clockInOut = (employeeId: number, clockedIn: boolean) => {
    //placeholder logikk 
    console.log(`Employee ID: ${employeeId}, Clocked In Status: ${clockedIn}`);

    setIsClockedIn(!clockedIn);
  }
  
  //temporary funksjon, skal stå "selectedEmployeeId" hvor "showClockButton" er,
  const showClockButton = true;
  
    console.log("Employee Shift Info:", employeeShiftInfo);
  //render component based on if there are any employees
  return (
    <div className="EmployeeShiftTable">
      {employeeShiftInfo && employeeShiftInfo.length > 0 ? (
        <>
        <EmployeeListDisplay
          employeeShiftInfo={employeeShiftInfo}
          onSelectEmployee={handleSelectedEmployee}
        />
        
        {showClockButton && (
          <ClockInOutButton
          employeeId={selectedEmployeeId ?? 0} // temporary ID
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

export default EmployeeShiftTable;