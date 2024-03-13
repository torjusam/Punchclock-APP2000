/* 
    Author: Torjus A.M 
    
    This component is responsible for providing a context for managing the array of employees.
    The context is shared across the entire app, allowing any component to access and modify the list.
    Uses a custom provider, and a custom hook to access the context.
*/
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Employee } from '../lib/employee';
import { fetchEmployees } from '../lib/dataAccess';

interface EmployeeContextProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    sortedEmployees: Employee[];
    setSortedEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

// Shared context for the employee state (initalized with empty placeholder props)
export const EmployeeContext = createContext<EmployeeContextProps | null>(null);

// Custom provider provides children components with state and updater function for the employee state.
export default function EmployeeContextProvider({ children }: { children: React.ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);

    // Initialize the employees array when the component mounts.
    useEffect(() => {
        const initializeEmployees = async () => {
            const fetchedEmployees = await fetchEmployees();

            setEmployees(fetchedEmployees);
        };
        initializeEmployees();
    }, []);
    
    // Sorts employee array when its updated.
    useEffect(() => {
        const sortedArray = sortEmployees(employees);
        setSortedEmployees(sortedArray);
    }, [employees]);

    const value = {
        employees,
        setEmployees,
        sortedEmployees,
        setSortedEmployees,
    };

    // Wraps children so that any child component can access the employee state.
    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
}

// Custom hook to access the employee context, so you dont have to check null everytime you use it.
export function useEmployeeContext() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within a EmployeeContextProvider');
    }
    return context;
}

// Function to sort the employees array by 1: status and 2: recency of clock-operations.
export function sortEmployees (employees: Employee[]) {
    // Copy of employees array to avoid mutating the original.
    return [...employees].sort((a, b) => {
        if (a.isClockedIn && !b.isClockedIn) {
            return -1;
        } else if (!a.isClockedIn && b.isClockedIn) {
            return 1;
        } else {
            const aLastCheckTime = a.isClockedIn ? new Date(a.lastCheckIn).getTime() : new Date(a.lastCheckOut).getTime();
            const bLastCheckTime = b.isClockedIn ? new Date(b.lastCheckIn).getTime() : new Date(b.lastCheckOut).getTime();
            return bLastCheckTime - aLastCheckTime;
        }
    });
};