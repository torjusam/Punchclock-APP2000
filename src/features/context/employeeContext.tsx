/**
 * @file Context provider for the employee list. Provides the employee list and functions to update the list globally,
 * allowing any component to access and modify the same list.
 * @Author Torjus A.M
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

/**
 * Provides the EmployeeContext to its child components.
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The Provider component with the EmployeeContext.
 */
export default function EmployeeContextProvider({children}: { children: ReactNode }) {
    const {employees, error, loading, setEmployees} = useFetchEmployees();
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);

    /**
     * Effect hook to create a sorted copy of the original list of employees whenever the list changes.
     * @effect
     */
    useEffect(() => {
        const sortedArray = sortEmployees(employees);
        setSortedEmployees(sortedArray);
    }, [employees]);

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

/**
 * Custom hook to access the EmployeeContext without having to null check.
 * @returns {EmployeeContextProps} The EmployeeContext.
 * @throws {Error} If the hook is not used within a EmployeeContextProvider.
 */
export function useEmployeeContext() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within a EmployeeContextProvider');
    }
    return context;
}

/**
 * Sorts a list of employees by 1: their clock-in status, and 2: the recency of their clock operations.
 * @param {Employee[]} employees - The list of employees to sort.
 * @returns {Employee[]} The sorted list.
 */
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