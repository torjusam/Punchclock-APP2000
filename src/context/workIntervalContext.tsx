/* 
    Author Torjus A.M
    Context for sharing the worktimedata this current week between components.
*/
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Employee} from '../lib/types/employee';
import {performFetch, performPost} from '../lib/workIntervalsAPI';
import {objectToPostgresInterval} from "../lib/durationToPGInterval";

interface workIntervalContextProps {
    employee: Employee;
    workTimeData: any;
    isLoading: boolean;
}

const WorkIntervalContext = createContext<workIntervalContextProps | undefined>(undefined);

export default function WorkIntervalProvider({children, employee}: { children: ReactNode, employee: Employee }) {
    const [workTimeData, setWorkTimedata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            const result = await performFetch(employee);
            setWorkTimedata(result);
            setIsLoading(false);
            // After data is calculated in the query, post it to the DB. Do not await it.
            if (result) {
                const sum = result[0].sum;
                const postgresIntervalString = objectToPostgresInterval(sum);
                performPost(employee, postgresIntervalString);
            }
        };

        fetchBalance();
    }, [employee.lastCheckOut]);

    return (
        <WorkIntervalContext.Provider value={{employee, workTimeData, isLoading}}>
            {children}
        </WorkIntervalContext.Provider>
    );
}

// Custom context hook for accessing the timer context directly and avoid having to null check on each use.
export const useWorkIntervalContext = () => {
    const context = useContext(WorkIntervalContext);
    if (context === undefined) {
        throw new Error('useClock must be used within a ClockProvider');
    }
    return context;
}

