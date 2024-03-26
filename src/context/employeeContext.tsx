/* 
    Author: Torjus A.M 
    
    This component is responsible for providing a context for managing the array of employees.
    The context is shared across the entire app, allowing any component to access and modify the list.
    Uses a custom provider, and a custom hook to access the context.
*/
import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Employee} from '../lib/employee';
import {fetchEmployees} from '../lib/dataAccess';
import {useSession} from "next-auth/react";

interface EmployeeContextProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    sortedEmployees: Employee[];
    setSortedEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    updateEmployeeStatus: (employee: Employee) => void;
}

// Shared context for the employee state (initalized with empty placeholder props)
export const EmployeeContext = createContext<EmployeeContextProps | null>(null);

// Custom provider provides children components with state and updater function for the employee state.
export default function EmployeeContextProvider({children}: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);
    const {data: session} = useSession();

    // Initialize the employees array when the component mounts.
    useEffect(() => {
        const initializeEmployees = async () => {
            const fetchedEmployees = await fetchEmployees();

            setEmployees(fetchedEmployees);
        };
        initializeEmployees();
        // Re-fetch after session is updated (login/logout).
    }, [session]);

    // Sorts employee array when its updated.
    useEffect(() => {
        const sortedArray = sortEmployees(employees);
        setSortedEmployees(sortedArray);
    }, [employees]);


    const updateEmployeeStatus = (employee) => {
        setEmployees(employees.map(emp => {
            if (emp.id !== employee.id) {
                return emp;
            }
            return {
                ...emp,
                isClockedIn: !employee.isClockedIn,
                lastCheckIn: employee.isClockedIn ? emp.lastCheckIn : new Date(),
                lastCheckOut: employee.isClockedIn ? new Date() : emp.lastCheckOut,
            };
        }));
    };

    /*
    const updateEmployeeStatus = (employee) => {
    const updatedEmployees = [...employees];
    const index = updatedEmployees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
        const updatedEmployee = {
            ...updatedEmployees[index],
            isClockedIn: !employee.isClockedIn,
            lastCheckIn: employee.isClockedIn ? updatedEmployees[index].lastCheckIn : new Date(),
            lastCheckOut: employee.isClockedIn ? new Date() : updatedEmployees[index].lastCheckOut,
        };
        updatedEmployees[index] = updatedEmployee;
        setEmployees(updatedEmployees);
    }
};
    */

    const value = {
        employees,
        setEmployees,
        sortedEmployees,
        setSortedEmployees,
        updateEmployeeStatus,
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
export function sortEmployees(employees: Employee[]) {
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
}