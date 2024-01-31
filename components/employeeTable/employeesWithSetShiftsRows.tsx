//Author: Torjus A.M, Thomas H
import React, { useEffect, useState } from 'react';
import { Employee } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../ClockInOutButton';
import GoToPersonalPageButton from '../redirectToPageButton';
import { EmployeeList } from '../../lib/employeeStorage';
import { deleteEmployee, performCheckOperation } from '../../lib/dataAccess';
import Link from 'next/link';
import DeleteEmployeeButton from '../deleteEmployeeButton';
import styles from '../../lib/styles/Buttons.module.css';

//manage states of component
const EmployeeShiftRows: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string | void>();

  //init state of component with helper functions, update state
  const initEmployeeList = async () => {
    try {
      await EmployeeList.initializeEmployeeList();
      setEmployeeList(EmployeeList.getEmployees());
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing employee list:', error);
      // handle error, show an error message (or retry?)
    }
  };

  useEffect(() => {
    initEmployeeList();
  }, []);
  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);

    const selectedEmployee = EmployeeList.getEmployeeById(id);
    //checks if employee exists, updates state variable based on isClockedIn property of employee 
    if (selectedEmployee) {
      setIsClockedIn(!!selectedEmployee.isClockedIn);
      setResultMessage('');
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
    } catch (error) {
      setResultMessage('Error during clock-in/clock-out');
    }

  };

  //placeholder for prototype: delete employee
  const handleDeleteClick = async () => {
    try {
      if (selectedEmployeeId) {
        const result = await deleteEmployee(selectedEmployeeId);
        setResultMessage(result);
        setEmployeeList(EmployeeList.getEmployees());
      } else {
        setResultMessage('No employee selected');
      }
    } catch (error) {
      setResultMessage('Error deleting employee');
    }
  };


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

            <div className="buttonContainer">
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
              <DeleteEmployeeButton
                key={selectedEmployeeId}
                employeeId={selectedEmployeeId}
                onDelete={handleDeleteClick}
              />
              {typeof resultMessage === 'string' && (
               <div className="result">{resultMessage}</div>
              )}
            </div>
          )}
        </>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
}
export default EmployeeShiftRows;