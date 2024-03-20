import React, { FC, createContext, useState, useContext, ReactNode } from 'react';

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

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useClock must be used within a ClockProvider');
  }
  return context;
};