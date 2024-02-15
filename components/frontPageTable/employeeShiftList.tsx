//Author: Torjus A.M, Thomas H
import React, { useEffect, useState, useContext, use } from 'react';
import { Employee } from '../../lib/definitions';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../Buttons/clockInOutButton'
import GoToPersonalPageButton from '../Buttons/redirectToPageButton';
import { EmployeeList } from '../../lib/employeeStorage';
import { deleteEmployee, performCheckOperation } from '../../lib/dataAccess';
import Link from 'next/link';
import DeleteEmployeeButton from '../Buttons/deleteEmployeeButton';
import container from '../../lib/styles/flexContainers.module.css';
import { useEmployeeContext } from '../employeeContext';

const EmployeeShiftList: React.FC = () => {
  // Use custom hook for state context
  const { employees, setEmployees, clockedInEmployees, setClockedInEmployees } = useEmployeeContext()
  const [selectedEmployeeId, setSelectedEmployeeId] =  useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string | void>();

  useEffect(() => {
    setIsClockedIn(clockedInEmployees.some(employee => employee.id === selectedEmployeeId));
  }, [selectedEmployeeId, clockedInEmployees]);

  const handleSelectedEmployee = (id: number) => {
    setSelectedEmployeeId(id);
    //const selectedEmployee = employees.find((employee) => employee.id === id)
  };

  const clockInOut = async (employeeId: number) => {
  
    const response = await performCheckOperation(employeeId, isClockedIn);
    if (response.ok) {
      setClockedInEmployees(prevClockedInEmployees => prevClockedInEmployees.filter(employee => employee.id !== employeeId));
      setResultMessage('Check' + (isClockedIn ? ' out' : ' in') + ' successful');
    } else {
      setResultMessage('Error during clock-in/clock-out');
    }
  };

  //placeholder for prototype: delete employee
  const handleDeleteClick = async () => {
    try {
      if (selectedEmployeeId) {
        const result = await deleteEmployee(selectedEmployeeId);
        setResultMessage(result);
        setEmployees(EmployeeList.getEmployees());
      } else {
        setResultMessage('No employee selected');
      }
    } catch (error) {
      setResultMessage('Error deleting employee');
    }
  };


  return (
    <>
      {employees.length > 0 ? (
        <EmployeeListDisplay
          employeeShiftInfo={employees}
          onSelectEmployee={handleSelectedEmployee}
          selectedEmployeeId={selectedEmployeeId}
        />
      ) : (
        <p>No employees found.</p>
      )}

      {selectedEmployeeId && (
        <div className={container.buttonContainer}>
          <ClockInOutButton
            employeeId={selectedEmployeeId}
            onClockInOut={clockInOut}
            isClockedIn={isClockedIn}
          />
          <Link href={`/${selectedEmployeeId}`}>
            <GoToPersonalPageButton employeeId={selectedEmployeeId} />
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
  );
}
export default EmployeeShiftList;