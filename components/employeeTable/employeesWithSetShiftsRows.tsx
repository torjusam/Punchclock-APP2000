//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { Employee } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import GoToPersonalPageButton from '../redirectToPageButton';
import { EmployeeList } from '../../lib/employeeStorage';
import { performCheckOperation } from '../../lib/dataAccess';
import Link from 'next/link';

//manage states of component
const EmployeeShiftRows: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string | void>('halla');

  //init state of component with helper functions, update state
  useEffect(() => {
    const initEmployeeList = async () => {
      try {
        await Promise.all([
          EmployeeList.initializeEmployeeList(),
        ]);

        setEmployeeList(EmployeeList.getEmployees());
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
  const clockInOut = async (employeeId: number, clockedIn: boolean) => {
    try {
        const isCheckIn = !isClockedIn;
        const result = await performCheckOperation(employeeId, isCheckIn);
        
        setResultMessage(result);
        setIsClockedIn(current => !current);
        setEmployeeList(EmployeeList.getEmployees());
    } catch(error) {
    setResultMessage('Error during clock-in/clock-out');
    }

  };
  // const showClockButton = true;

  return (
    <div className="EmployeeShiftTable">
      {employeeList.length > 0 ? (
        <>
          <EmployeeListDisplay
            employeeShiftInfo={employeeList}
            onSelectEmployee={handleSelectedEmployee}
            selectedEmployeeId={selectedEmployeeId}
          />
          {selectedEmployeeId && (
            <>
              <ClockInOutButton
                employeeId={selectedEmployeeId}
                onClockInOut={clockInOut}
                isClockedIn={isClockedIn}
              />
            
              <Link href={`/${selectedEmployeeId}`}>
                  <GoToPersonalPageButton 
                  employeeId={selectedEmployeeId}
                  />
              </Link>
              {resultMessage && <div className="result-message">{resultMessage}</div>}
            </>
          )}
        </>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeShiftRows;