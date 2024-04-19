/**
 * @file Context provider for the employee list. Provides the employee list and functions to update the list globally,
 * allowing any component to access and modify the same list.
 * @author Torjus A.M
 */
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import Employee from '../../utils/employee';
import {ResError} from "../../utils/types";
import useFetchEmployees from "./hooks/useFetchEmployees";
import {sortEmployees} from "./services/sortEmployees";

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

    // Hook to create a sorted copy whenever the original list changes.
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