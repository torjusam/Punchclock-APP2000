/**
 * @file Context provider for the employee work data context. Provides the timer, balance, and timer limit for the employee.
 * @author Torjus A.M
 */
import React, {createContext, useContext} from 'react';
import {Employee} from '../../lib/types/employee';
import {useEmployeeTimer} from "./hooks/usePunchTimer";
import {useCheckTimerLimit} from "../clock-operation/hooks/timerLimitReached";

/**
 * Interface for the context properties of the EmployeeWorkDataContext.
 * @interface
 * @property {number} timer - The current timer value.
 * @property {(time: number) => void} setTimer
 * @property {any} balance - The balance of time worked this calendar week
 * @property {boolean} timerLimit - Indicates if the timer limit has been reached.
 * @property {(isOver15Hours: boolean) => void} setTimerLimit
 * @property {boolean} isTimerLoading - Indicates if the timer data is currently loading.
 * @property {boolean} isBalanceLoading - Indicates if the balance data is currently loading.
 */
interface EmployeeWorkDataContextProps {
    timer: number;
    setTimer: (time: number) => void;
    timerLimit: boolean;
    setTimerLimit: (isOver15Hours: boolean) => void;
    isTimerLoading: boolean;
}

const EmployeeWorkDataContext = createContext<EmployeeWorkDataContextProps | undefined>(undefined);

export default function EmployeeWorkDataProvider({children, employee}: {
    children: React.ReactNode,
    employee: Employee
}) {
    const {
        timer,
        setTimer,
        timerLimit,
        setTimerLimit,
        isTimerLoading
    } = useEmployeeTimer(employee);

    // Start hook to check if the timer limit has been reached.
    useCheckTimerLimit(employee, new Date(), timerLimit);

    return (
        <EmployeeWorkDataContext.Provider
            value={{
                timer,
                setTimer,
                timerLimit,
                setTimerLimit,
                isTimerLoading,
            }}>
            {children}
        </EmployeeWorkDataContext.Provider>
    );
}

/**
 * Custom hook to access the EmployeeWorkDataContext without having to null check.
 * @returns {EmployeeWorkDataContextProps} The EmployeeWorkDataContext.
 * @throws {Error} If the hook is not used within a EmployeeContextProvider.
 */
export function useEmployeeWorkDataContext() {
    const context = useContext(EmployeeWorkDataContext);
    if (!context) {
        throw new Error('useEmployeeWorkDataContext must be used within a EmployeeWorkDataProvider');
    }
    return context;
}