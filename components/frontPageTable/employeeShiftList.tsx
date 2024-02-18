//Author: Torjus A.M, Thomas H
import React, { useEffect, useState, useContext, use } from 'react';
import { Employee } from '../../lib/employee';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../Buttons/clockInOutButton'
import GoToPersonalPageButton from '../Buttons/redirectToPageButton';
import { deleteEmployee, performCheckOperation } from '../../lib/dataAccess';
import Link from 'next/link';
import DeleteEmployeeButton from '../Buttons/deleteEmployeeButton';
import container from '../../lib/styles/flexContainers.module.css';
import { useEmployeeContext } from '../employeeContext';
import ButtonsBelowTable from '../Buttons/buttonsBelowTable';

const EmployeeShiftList: React.FC = () => {
  // Use custom hook for state context
  const { employees, setEmployees, clockedInEmployees, setClockedInEmployees } = useEmployeeContext()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string | void>();

  useEffect(() => {
    if (selectedEmployee) {
      // Fetch the latest data for the selected employee
      const fetchSelectedEmployee = async () => {
        const updatedEmployee = employees.find((employee) => employee.id === selectedEmployee.id);
        setSelectedEmployee(updatedEmployee || null);
      };
      fetchSelectedEmployee();
    }
  }, [selectedEmployee]);

  const handleSelectedEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <>
      {employees.length > 0 ? (
        <EmployeeListDisplay
          employeeShiftInfo={employees}
          onSelectEmployee={handleSelectedEmployee}
          selectedEmployee={selectedEmployee}
        />
      ) : null}
      <ButtonsBelowTable
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </>
  );
}

export default EmployeeShiftList;