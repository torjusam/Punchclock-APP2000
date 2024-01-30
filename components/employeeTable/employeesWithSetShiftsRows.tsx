//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { Employee } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import {
  initializeEmployeeList,
  getEmployeesWithUpcomingShifts,
  getPresentEmployees,
  getNotPresentEmployees,
  getEmployeeById,
  updateEmployeeStatus
} from '../../lib/employeeStorage';

//manage states of component
const EmployeeShiftRows: React.FC = () => {
  const [scheduledEmployees, setScheduledEmployees] = useState<Employee[]>([]);
  const [presentEmployees, setPresentEmployees] = useState<Employee[]>([]);
  const [notPresentEmployees, setNotPresentEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

//init state of component with helper functions, update state
useEffect(() => {
  const initEmployeeList = async () => {
    await Promise.all([
      initializeEmployeeList(),
    ]);

    setScheduledEmployees(getEmployeesWithUpcomingShifts());
    setPresentEmployees(getPresentEmployees());
    setNotPresentEmployees(getNotPresentEmployees());
    setIsLoading(false);
  };

  initEmployeeList();
}, []);

  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);

    const selectedEmployee = getEmployeeById(id);
    //checks if employee exists, updates state variable based on isClockedIn property of employee 
    if (selectedEmployee) {
      setIsClockedIn(!!selectedEmployee.isClockedIn);
    }
  };

  const clockInOut = (selectedEmployee: Employee) => {
    updateEmployeeStatus(selectedEmployee.id, !selectedEmployee.isClockedIn);
  };

  // const showClockButton = true;

  return (
    <div className="EmployeeShiftTable">
      {scheduledEmployees.length > 0 || presentEmployees.length > 0 || notPresentEmployees.length > 0 ? (
        <>

          /
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