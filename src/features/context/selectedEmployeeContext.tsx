/**
 * @file This file provides the context for the selected employee in the application.
 * It includes the context provider and a custom hook for accessing the context.
 * @author Torjus A.M
 */
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import {useEmployeeContext} from './employeeContext';
import {useTimerLimit} from "../clock-operation/hooks/useTimerLimit";
import {usePunchClockTimer} from "./hooks/usePunchClockTimer";

/**
 * @typedef SelectedEmployeeContextProps
 * @property {Employee | null} selectedEmployee - The currently selected employee.
 * @property {(employee: Employee | null) => void} setSelectedEmployee - Function to set the selected employee.
 * @property {(employee: Employee) => void} updateEmployeeStatus - Function to update the status of the selected employee.
 * @property {number} timer - The current timer value.
 * @property {(time: number) => void} setTimer - Function to set the timer value.
 * @property {boolean} timerLimit - Whether the timer limit has been reached.
 * @property {boolean} isTimerLoading - Whether the timer is currently loading.
 */
interface SelectedEmployeeContextProps {
    selectedEmployee: Employee | null;
    setSelectedEmployee: (employee: Employee | null) => void;
    updateEmployeeStatus: (employee: Employee) => void;
    timer: number;
    setTimer: (time: number) => void;
    timerLimit: boolean;
    isTimerLoading: boolean;
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
 * @param {SelectedEmployeeProviderProps} props The props for the component.
 * @returns {React.Element} A context provider component.
 */
export default function SelectedEmployeeProvider({children, employee}: SelectedEmployeeProviderProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employee);
    const {setEmployees} = useEmployeeContext();
    const {timer, setTimer, timerLimit, isTimerLoading} = usePunchClockTimer(employee);

    useEffect(() => {
        setSelectedEmployee(employee);
    }, [employee]);

    // Start hook to check if the timer limit has been reached.
    useTimerLimit(employee, new Date(), timerLimit);

    /**
     * Toggles clock-in/clock-out status of an employee by updating the isClockedIn property,
     * then updating the employee list with the new employee object.
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
        <SelectedEmployeeContext.Provider value={{
            selectedEmployee,
            setSelectedEmployee,
            updateEmployeeStatus,
            timer,
            setTimer,
            timerLimit,
            isTimerLoading,
        }}>
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