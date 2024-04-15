/**
 * @file Context provider for the employee work data context. Provides the timer, balance, and timer limit for the employee.
 * @author Torjus A.M
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import {useFetchBalance} from "./hooks/useFetchBalance";
import {useEmployeeTimer} from "./hooks/usePunchTimer";

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
    balance: any;
    timerLimit: boolean;
    setTimerLimit: (isOver15Hours: boolean) => void;
    isTimerLoading: boolean;
    isBalanceLoading: boolean;
}

const EmployeeWorkDataContext = createContext<EmployeeWorkDataContextProps | undefined>(undefined);

export default function EmployeeWorkDataProvider({children, employee}: {
    children: React.ReactNode,
    employee: Employee
}) {
    const {balance, isBalanceLoading} = useFetchBalance(employee);
    const {
        timer,
        setTimer,
        timerLimit,
        setTimerLimit,
        isTimerLoading
    } = useEmployeeTimer(employee);

    return (
        <EmployeeWorkDataContext.Provider
            value={{
                timer,
                setTimer,
                balance,
                timerLimit,
                setTimerLimit,
                isTimerLoading,
                isBalanceLoading
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