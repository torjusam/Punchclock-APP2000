/**
 * @file Context provider for the selected employee.
 * @author Torjus A.M
 */
import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import moment from 'moment';
import {useRouter} from "next/router";
import {useEmployeeContext} from './employeeContext';

interface SelectedEmployeeContextProps {
    selectedEmployee: Employee | null;
    setSelectedEmployee: Dispatch<SetStateAction<Employee>>;
    updateEmployeeStatus: (employee: Employee) => void;
}

export const SelectedEmployeeContext = createContext<SelectedEmployeeContextProps | undefined>(undefined);

/**
 * The SelectedEmployeeProvider component is a context provider that manages the state of the selected employee.
 * It provides the selected employee state, and functions to update this state to its child components.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child components of this provider.
 * @returns {React.Element} A context provider component.
 */
export default function SelectedEmployeeProvider({children}: { children: ReactNode }) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
    const {employees, setEmployees, loading} = useEmployeeContext();
    const router = useRouter();
    const {employeeId} = router.query;

    /**
     * Hook that updates the selected employee when mounted or when relevant states change.
     * Finds and sets the daily work time for the employee.
     */
    useEffect(() => {
        // If loading is true, return early.
        if (loading) return;

        if (employeeId && employees) {
            // Maps over and finds the specific employee from the employees context.
            const employeesMap = new Map(employees.map(employee => [employee.id, employee]));
            const foundEmployee = employeesMap.get(Number(employeeId));

            if (foundEmployee) {
                // Calculates the daily work time for the employee by dividing the planned work time by 5.
                const dailyWorkTime = moment.duration(
                    moment.duration(foundEmployee.PlannedWork).asMilliseconds() / 5,
                    'milliseconds'
                );
                foundEmployee.dailyWorkTime = dailyWorkTime;
                setSelectedEmployee(foundEmployee);
            }
        }
    }, [selectedEmployee, employeeId, loading]);

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