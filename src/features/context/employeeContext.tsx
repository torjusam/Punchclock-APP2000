/* 
    Author: Torjus A.M 
    
    This component is responsible for providing a context for managing the array of employees.
    The context is shared across the entire app, allowing any component to access and modify the list.
    Uses a custom provider, and a custom hook to access the context.
*/
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import {ResError} from "../../lib/types/types";
import useFetchEmployees from "./hooks/useFetchEmployees";
import moment from "moment";

interface EmployeeContextProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    sortedEmployees: Employee[];
    setSortedEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    error?: ResError;
    loading: boolean;
}

export const EmployeeContext = createContext<EmployeeContextProps | null>(null);

export default function EmployeeContextProvider({children}: { children: ReactNode }) {
    const {employees, error, loading, setEmployees} = useFetchEmployees();
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);

    // Hook to create sorted copy of the original list, to avoid mutating original
    useEffect(() => {
        const sortedArray = sortEmployees(employees);
        setSortedEmployees(sortedArray);
    }, [employees]);

    // Wraps children so that any child component can access the employee state.
    return (
        <EmployeeContext.Provider
            value={{
                employees,
                setEmployees,
                sortedEmployees,
                setSortedEmployees,
                loading,
                error
            }}>
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

// Function to sort the employees array by 1: status, 2: recency of clock-operations.
export function sortEmployees(employees: Employee[]) {
    // Copy of employees array to avoid mutating the original.
    return [...employees].sort((a, b) => {
        if (a.isClockedIn && !b.isClockedIn) {
            return -1;
        } else if (!a.isClockedIn && b.isClockedIn) {
            return 1;
        } else {
            const aLastCheckTime = a.isClockedIn ? moment(a.lastCheckIn) : moment(a.lastCheckOut);
            const bLastCheckTime = b.isClockedIn ? moment(b.lastCheckIn) : moment(b.lastCheckOut);
            return bLastCheckTime.diff(aLastCheckTime);
        }
    });
}