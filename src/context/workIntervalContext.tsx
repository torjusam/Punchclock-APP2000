/* 
    Author: Torjus A.M
    Context for for sharing the current checktime between components.
*/
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Employee } from '../lib/employee';

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
    const fetchData = async () => {
      const result = await performFetch(employee);
      setworkTimedata(result);
      setIsLoading(false);
      console.log(result);
    };

    fetchData();
  }, [employee.lastCheckIn, employee.lastCheckOut]);

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

const performFetch = async (employee) => {
  const employeeId = employee.id;
  const response = await fetch('/api/getWorkTime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeId }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.error('Error:', response.status);
    return [];
  }
};