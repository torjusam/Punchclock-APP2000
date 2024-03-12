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
}

// Shared context for the employee state (initalized with empty placeholder props)
export const EmployeeContext = createContext<EmployeeContextProps | null>(null);

// Custom provider provides children components with state and updater function for the employee state.
export default function EmployeeContextProvider({ children }: { children: React.ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    // Initialize the employees array when the component mounts.
    useEffect(() => {
        const initializeEmployees = async () => {
            const fetchedEmployees = await fetchEmployees();
            
            setEmployees(fetchedEmployees);
        };
        initializeEmployees();
    }, []);

    /* useMemo hook for creating a memoized version of employes array, that is sorted based on isClockedIn status
    and last check time. This sorted array is recalculated only when the employees array changes. */
    const sortedEmployees = useMemo(() => {
        return employees.sort((a, b) => {
            if (a.isClockedIn && !b.isClockedIn) {
                return -1;
            } else if (!a.isClockedIn && b.isClockedIn) {
                return 1;
            } else {
                // When the clockedIn-status of a & b are the same, sort based on last check time.
                const aLastCheckTime = a.isClockedIn ? new Date(a.lastCheckIn).getTime() : new Date(a.lastCheckOut).getTime();
                const bLastCheckTime = b.isClockedIn ? new Date(b.lastCheckIn).getTime() : new Date(b.lastCheckOut).getTime();
                return bLastCheckTime - aLastCheckTime;
            }
        });
        // Dependency array specifies to only update when employees array is changed.
    }, [employees]);

    const value = {
        employees,
        setEmployees,
        sortedEmployees,
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