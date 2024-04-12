/*
    Author Torjus A.M
    This context is responsible for providing information for various working-time for a specific employee.
    It is responsible for setting the timer, and setting and getting the balance for the employee.
*/
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Employee} from '../lib/types/employee';
import {performFetch, performPost} from '../lib/workIntervalsAPI';
import {objectToPostgresInterval} from "../lib/durationToPGInterval";
import moment from "moment";

interface EmployeeWorkDataContextProps {
    timer: number;
    setTimer: (time: number) => void;
    balance: any;
    setBalance: (data: any) => void;
    timerLimit: boolean;
    setTimerLimit: (isOver15Hours: boolean) => void;
    isTimerLoading: boolean;
}

const EmployeeWorkDataContext = createContext<EmployeeWorkDataContextProps | undefined>(undefined);

export default function EmployeeWorkDataProvider({children, employee}: {
    children: React.ReactNode,
    employee: Employee
}) {
    const [timer, setTimer] = useState(0);
    const [balance, setBalance] = useState(null);
    const [isTimerLoading, setIsTimerLoading] = useState(false);
    const [timerLimit, setTimerLimit] = useState(false);

    useEffect(() => {
        // Fetch and update workTimeData when the employee clocks out
        // TODO: Fix
        const fetchBalance = async () => {
            const result = await performFetch(employee);
            setBalance(result);
            // After data is calculated in the query, post it to the DB. Do not await it.
            if (result)
                performPost(employee, objectToPostgresInterval(result[0].sum));
        };
        if (employee?.lastCheckOut)
            fetchBalance();

        // Rerun when employee checks out. Probably not optimal in regards to performance but it works.
    }, [employee?.lastCheckOut]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (employee.isClockedIn) {
            setIsTimerLoading(true);
            interval = setInterval(() => {
                // Calculate time difference between now and the last check-in time in seconds
                const timeDifference = moment().diff(moment(employee.lastCheckIn), 'seconds');
                setTimer(timeDifference);
                setIsTimerLoading(false);

                /* If the timer exceeds 15 hours, send signal to clock the employee out.
                15 hours is a placeholder value for the limit, this would have to include
                logic from vismas system in order to variate the limit depending on the employee's work hours. */
                setTimerLimit(timeDifference >= 54000);

                // Interval runs every second
            }, 1000);
        }
        // Cleanup function to clear the interval when the component unmounts, or before the effect runs again
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [employee]);

    return (
        <EmployeeWorkDataContext.Provider
            value={{timer, setTimer, balance, setBalance, timerLimit, setTimerLimit, isTimerLoading}}>
            {children}
        </EmployeeWorkDataContext.Provider>
    );
}

export function useEmployeeWorkDataContext() {
    const context = useContext(EmployeeWorkDataContext);
    if (!context) {
        throw new Error('useEmployeeWorkDataContext must be used within a EmployeeWorkDataProvider');
    }
    return context;
}