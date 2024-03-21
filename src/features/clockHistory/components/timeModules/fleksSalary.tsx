/*
    Author: Torjus A.M
    Component responsible for fetching and updating the fleks salary.
*/
import React, { FC, useState, useEffect } from 'react';
import { Employee } from '../../../../lib/employee';
import { formatInterval } from '../../services/formatInterval';
import { ClockHistoryData } from '../../../../lib/types';
import { Interval } from '../../../../lib/types';
import styles from '../clockHistory.module.css';
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface FleksSalaryProps {
    employee: Employee;
    data: Array<ClockHistoryData>;
}

const FleksSalary: FC<FleksSalaryProps> = ({ employee, data }) => {
    const [totalTime, setTotalTime] = useState<Interval | null>(null);

    // Data fetched from the database is displayed at first.
    console.log("Salary data: ", employee.Fleksitd_Balance);
    // Update totalTime by adding the overtime interval from the latest clock in/out row after an operation is performed.
    useEffect(() => {
        if (data && data.length > 0) {
            const latestOvertimeInterval = data[data.length - 1].overtimeinterval;
            if (latestOvertimeInterval && totalTime) {
                const updatedTotalTime = {
                    hours: (totalTime.hours || 0) + (latestOvertimeInterval.hours || 0),
                    minutes: (totalTime.minutes || 0) + (latestOvertimeInterval.minutes || 0),
                    seconds: (totalTime.seconds || 0) + (latestOvertimeInterval.seconds || 0),
                };
                setTotalTime(updatedTotalTime);
            }
        }
    }, [data]);
    
    return (
        <div className={styles.timeModules}>
            <h1 style={{ color: '#0DB714' }}>Fleks saldo</h1>
            <h2 style={{ color: '#0DB714' }}>{totalTime ? formatInterval(totalTime) : '00t 00m'}</h2>
        </div>
    );
};

export default FleksSalary;