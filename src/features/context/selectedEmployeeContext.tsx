/**
 * @file Context provider for the selected employee.
 * @author Torjus A.M
 */
import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import {useEmployeeContext} from './employeeContext';

interface SelectedEmployeeContextProps {
    selectedEmployee: Employee | null;
    setSelectedEmployee: Dispatch<SetStateAction<Employee>>;
    updateEmployeeStatus: (employee: Employee) => void;
}

export const SelectedEmployeeContext = createContext<SelectedEmployeeContextProps | undefined>(undefined);

interface SelectedEmployeeProviderProps {
    children: ReactNode;
    employee: Employee;
}

/**
 * The SelectedEmployeeProvider component is a context provider that manages the state of the selected employee.
 * It provides the selected employee state, and functions to update this state to its child components.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child components of this provider.
 * @returns {React.Element} A context provider component.
 */
export default function SelectedEmployeeProvider({children, employee}: SelectedEmployeeProviderProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employee);
    const {setEmployees} = useEmployeeContext();

    useEffect(() => {
        setSelectedEmployee(employee);
    }, [employee]);

    /**
     * Toggles clock-in/clock-out status of an employee.
     * Updates check-in/out times and employee states.
     *
     * @param {Employee} selectedEmployee - The employee object whose status needs to be updated.
     * @returns {Promise<void>} - A promise that resolves when the employee status has been updated.
     */
    const updateEmployeeStatus = async (selectedEmployee: Employee): Promise<void> => {
        setEmployees(prevEmployees => prevEmployees.map(emp => {
            if (emp.id === selectedEmployee.id) {
                const updatedEmployee = {
                    ...emp,
                    isClockedIn: !selectedEmployee.isClockedIn,
                    lastCheckIn: selectedEmployee.isClockedIn ? emp.lastCheckIn : new Date(),
                    lastCheckOut: selectedEmployee.isClockedIn ? new Date() : emp.lastCheckOut,
                };
                setSelectedEmployee(updatedEmployee); // Update the selectedEmployee state
                return updatedEmployee;
            }
            return emp;
        }));
    };

    return (
        <SelectedEmployeeContext.Provider value={{selectedEmployee, setSelectedEmployee, updateEmployeeStatus}}>
            {children}
        </SelectedEmployeeContext.Provider>
    );

}

/**
 * Custom hook to access the SelectedEmployeeContext without having to null check.
 * @returns {SelectedEmployeeContextProps} The SelectedEmployeeContextProps.
 * @throws {Error} If the hook is not used within a SelectedEmployeeContextProps.
 */
export function useSelectedEmployeeContext() {
    const context = useContext(SelectedEmployeeContext);
    if (!context) {
        throw new Error('useSelectedEmployee must be used within a SelectedEmployeeProvider');
    }
    return context;
}