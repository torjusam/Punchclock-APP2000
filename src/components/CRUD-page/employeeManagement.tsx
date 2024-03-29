//Author: Torjus A.M
//Prototype placeholder
import React, { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, deleteEmployee } from '../../lib/dataAccess';
import {Employee} from '../../lib/types/employee';
import EmployeeList from './employeeList';


const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  // Henter ansatt
  useEffect(() => {
    const getEmployees = async() => {
      const fetchedEmployees = await fetchEmployees();
      setEmployees(fetchedEmployees);
    };

    getEmployees();
  }, []);

  // funksjon for å opprette ny ansatt
  const handleAddEmployee = async (firstName: string, lastName: string) => {
    const result = await createEmployee(firstName, lastName);
    console.log(result);
    // refresh listen etter ansatt er opprettet
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = async (id: number) => {
    const result = await deleteEmployee(id);
    console.log(result);
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
  }

  // implementer oppdatering her:::

  return (
    <div>
      <EmployeeList employees={employees} onDelete={handleDeleteEmployee}/>
     {/* <EmployeeForm onAdd={handleAddEmployee}/> */}
      {/* Update form her senere */}
    </div>
  );
};

export default EmployeeManagement;