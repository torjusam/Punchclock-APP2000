//Author: Torjus A.M
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '../lib/employee';
import { fetchEmployees } from '../lib/dataAccess';
import { EmployeeList } from '../lib/employeeStorage';

interface EmployeeContextProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    clockedInEmployees: Employee[];
    setClockedInEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

// Shared context for the employee state (initalized with empty placeholder props)
export const EmployeeContext = createContext<EmployeeContextProps | null>(null);

// Custom provider provides children components with state and updater function for the employee state
export default function EmployeeContextProvider({ children }: { children: React.ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [clockedInEmployees, setClockedInEmployees] = useState<Employee[]>([]);

    // Initalize state for employees and clockedInEmployees
    useEffect(() => {
        const initializeEmployees = async () => {
            setEmployees(await fetchEmployees());
            await setClockedInEmployees(employees.filter((employee) => employee.isClockedIn));
        };

        initializeEmployees();
    }, []);

    return (
        <EmployeeContext.Provider
            value={{
                employees, setEmployees,
                clockedInEmployees, setClockedInEmployees
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
}

// Custom hook to access the employee context (dont have to check null everytime you use the state)
export function useEmployeeContext() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within a EmployeeContextProvider');
    }
    return context;
}