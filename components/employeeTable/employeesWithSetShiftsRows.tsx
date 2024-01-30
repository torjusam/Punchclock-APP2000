//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { Employee } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import { EmployeeList } from '../../lib/employeeStorage';

//manage states of component
const EmployeeShiftRows: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]> ([]);
  const [scheduledEmployees, setScheduledEmployees] = useState<Employee[]>([]);
  const [presentEmployees, setPresentEmployees] = useState<Employee[]>([]);
  const [absentEmployees, setAbsentEmployees] = useState<Employee[]>([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

//init state of component with helper functions, update state
useEffect(() => {
  const initEmployeeList = async () => {
    try {
      await Promise.all([
        EmployeeList.initializeEmployeeList(),
      ]);

      setEmployeeList(EmployeeList.getEmployees());
      setScheduledEmployees(EmployeeList.getScheduledEmployees());
      setPresentEmployees(EmployeeList.getPresentEmployees());
      setAbsentEmployees(EmployeeList.getAbsentEmployees());
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing employee list:', error);
      // handle error, show an error message (or retry?)
    }
  };

  initEmployeeList();
}, []);

  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);

    const selectedEmployee = EmployeeList.getEmployeeById(id);
    //checks if employee exists, updates state variable based on isClockedIn property of employee 
    if (selectedEmployee) {
      setIsClockedIn(!!selectedEmployee.isClockedIn);
    }
  };

  //takes the selectedEmployee, and updates its clockedIn status by inverting current status
  //update of status forces refresh of entire list
  const clockInOut = (employeeId: number, clockedIn: boolean) => {
    EmployeeList.updateEmployeeStatus(employeeId, clockedIn);
    setIsClockedIn(!clockedIn);
  };
  // const showClockButton = true;

  return (
    <div className="EmployeeShiftTable">
      {scheduledEmployees.length > 0 || presentEmployees.length > 0 || absentEmployees.length > 0 ? (
        <>

          /
          <EmployeeListDisplay
            employeeShiftInfo={presentEmployees}
            onSelectEmployee={handleSelectedEmployee}
          />
          <EmployeeListDisplay
            employeeShiftInfo={absentEmployees}
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