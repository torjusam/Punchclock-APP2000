/* 
    Author: Torjus A.M
    Context for for sharing the latest workInterval from the clockHistory hook.
    Used in the punchclock module to set the timer to the latest workInterval after clocking out,
    to prevent values not being in sync.
    Includes a boolean state variable to check if the timer has exceeded 15 hours. If so, clock employee out.
*/
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useWorkIntervalContext } from './workIntervalContext';
import { clockOut } from '../features/clock-operation/services';

interface TimerContextProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isOver15Hours: boolean;
  setIsOver15Hours: (isOver15Hours: boolean) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export default function TimerProvider ({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isOver15Hours, setIsOver15Hours] = useState(false);
  const { workTimeData } = useWorkIntervalContext();

  useEffect(() => {
    if (isOver15Hours) {
      // Perform clock out operation when 15 hours have passed since checking in.
      clockOut(workTimeData.employee, workTimeData, new Date());
    }
  }, [isOver15Hours]);

  return (
    <TimerContext.Provider value={{ currentTime, setCurrentTime, isOver15Hours, setIsOver15Hours }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom context hook for accessing the timer context directly and avoid having to null check on each use.
export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useClock must be used within a ClockProvider');
  }
  return context;
};

