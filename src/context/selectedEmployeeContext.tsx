import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import {Employee} from '../lib/types/employee';
import moment from 'moment';
import {useRouter} from "next/router";
import {useEmployeeContext} from './employeeContext';

interface SelectedEmployeeContextProps {
    selectedEmployee: Employee | null;
    setSelectedEmployee: Dispatch<SetStateAction<Employee>>;
    updateEmployeeStatus: (employee: Employee) => void;
}

export const SelectedEmployeeContext = createContext<SelectedEmployeeContextProps | undefined>(undefined);

export default function SelectedEmployeeProvider({children}: { children: ReactNode }) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
    const {employees, setEmployees, loading} = useEmployeeContext();
    const router = useRouter();
    const {employeeId} = router.query;

    useEffect(() => {
        if (loading) return;

        if (employeeId && employees) {
            // Maps over and finds the specific employee from the employees context.
            const employeesMap = new Map(employees.map(employee => [employee.id, employee]));
            const foundEmployee = employeesMap.get(Number(employeeId));

            if (foundEmployee) {
                /* Sets employees plannedwork as a duration in milliseconds, then divides them by 5.
                e.g: 40 hours = 2,400,000 milliseconds, 2,400,000 / 5 = 480,000 milliseconds (8 hours a day) */
                const totalMilliseconds = moment.duration(foundEmployee.PlannedWork).asMilliseconds();
                const dailyWorkTimeInMilliseconds = totalMilliseconds / 5;
                const dailyWorkTime = moment.duration(dailyWorkTimeInMilliseconds, 'milliseconds');
                foundEmployee.dailyWorkTime = dailyWorkTime;
                setSelectedEmployee(foundEmployee);
            }
        }
    }, [selectedEmployee, employeeId, loading]);

    const updateEmployeeStatus = async (selectedEmployee: Employee) => {
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

export function useSelectedEmployeeContext() {
    const context = useContext(SelectedEmployeeContext);
    if (!context) {
        throw new Error('useSelectedEmployee must be used within a SelectedEmployeeProvider');
    }
    return context;
}