//Author: Torjus A.M
//Prototype placeholder
import React, {useState, useEffect} from 'react';
import {fetchEmployees, createEmployee, deleteEmployee} from '../../lib/dataAccess';
import {Employee} from '../../lib/types/employee';
import EmployeeList from './employeeList';
import styles from './employeeListItem.module.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    // Henter ansatt
    useEffect(() => {
        const getEmployees = async () => {
            const fetchedEmployees = await fetchEmployees();
            setEmployees(fetchedEmployees);
        };

        getEmployees();
    }, []);

    // funksjon for å opprette ny ansatt, skal flyttes til create ansatt page
    const handleAddEmployee = async (firstName: string, lastName: string) => {
        const result = await createEmployee(firstName, lastName);
        console.log(result);
        // refresh listen etter ansatt er opprettet
        const updatedEmployees = await fetchEmployees();
        setEmployees(updatedEmployees);
    };

    const handleCreateNewEmployee = () => {
    };

    const handleDeleteEmployee = async (id: number) => {
        const result = await deleteEmployee(id);
        console.log(result);
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
    }

    const handleEditEmployee = (employee: Employee) => {
        // fix
    }


    return (
        <div>
            <EmployeeList
                employees={employees}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
            />
            <div className={styles.createButtonContainer}>
                <button
                    className={styles.createButton}
                    onClick={handleCreateNewEmployee}
                >
                    Create New Employee
                </button>
            </div>
            {/* <EmployeeForm onAdd={handleAddEmployee}/> */}
            {/* Update form her senere */}
        </div>
    );
};

export default EmployeeManagement;