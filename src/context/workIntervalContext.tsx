/* 
    Author Torjus A.M
    Context for sharing the worktimedata this current week between components.
*/
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Employee } from '../lib/employee';
import { performFetch, performPost } from '../lib/workIntervalsAPI';

interface workIntervalContextProps {
    employee: Employee;
    workTimeData: any;
    isLoading: boolean;
}

const WorkIntervalContext = createContext<workIntervalContextProps | undefined>(undefined);

export default function WorkIntervalProvider({ children, employee }: { children: ReactNode, employee: Employee }) {
    const [workTimeData, setworkTimedata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            const result = await performFetch(employee);
            setworkTimedata(result);
            setIsLoading(false);
        };

        fetchBalance();
    }, [employee.lastCheckOut]);

    // Post salary to the database after data is changed, which is after all other operations are done on a clock-out.
    useEffect(() => {
        if (!workTimeData) return;
    
        const postBalance = async (employee, workTimeData) => {
            await performPost(employee, workTimeData);
        };
    
        postBalance(employee, workTimeData);
    }, [workTimeData]);

    return (
        <WorkIntervalContext.Provider value={{ employee, workTimeData, isLoading }}>
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

