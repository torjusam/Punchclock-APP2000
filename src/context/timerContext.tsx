/* 
    Author: Torjus A.M
    Context for for sharing the latest workInterval from the clockHistory hook.
    Used in the punchclock module to set the timer to the latest workInterval after clocking out,
    to prevent values not being in sync.
*/
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimerContextProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export default function TimerProvider ({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <TimerContext.Provider value={{ currentTime, setCurrentTime }}>
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