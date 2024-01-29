//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { Employee  } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import {
  initializeEmployeeList,
  getEmployeesWithUpcomingShifts,
  getPresentEmployees,
  getNotPresentEmployees,
  getEmployeeById,
} from '../../lib/employeeStorage';


const EmployeeShiftRows: React.FC = () => {
  const [scheduledEmployees, setScheduledEmployees] = useState<Employee[]>([]);
  const [presentEmployees, setPresentEmployees] = useState<Employee[]>([]);
  const [notPresentEmployees, setNotPresentEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);

  useEffect(() => {
    const initEmployeeList = async () => {
      await initializeEmployeeList();
      setScheduledEmployees(getEmployeesWithUpcomingShifts());
      setPresentEmployees(getPresentEmployees());
      setNotPresentEmployees(getNotPresentEmployees());
    };

    initEmployeeList();
  }, []);

  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);

    const selectedEmployee = getEmployeeById(id);

    if (selectedEmployee) {
      setIsClockedIn(!!selectedEmployee.isClockedIn);
    }

  };

  const clockInOut = (employeeId: number, clockedIn: boolean) => {
    console.log(`Employee ID: ${employeeId}, Clocked In Status: ${clockedIn}`);
    setIsClockedIn(!clockedIn);
  };

  // const showClockButton = true;

  return (
    <div className="EmployeeShiftTable">
      {scheduledEmployees.length > 0 || presentEmployees.length > 0 || notPresentEmployees.length > 0  ? (
        <>
          <EmployeeListDisplay
            employeeShiftInfo={scheduledEmployees}
            onSelectEmployee={handleSelectedEmployee}
          />
          <EmployeeListDisplay 
            employeeShiftInfo={presentEmployees}
            onSelectEmployee={handleSelectedEmployee}
          />
          <EmployeeListDisplay 
            employeeShiftInfo={notPresentEmployees}
            onSelectEmployee={handleSelectedEmployee}
          />
          {selectedEmployeeId && (
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