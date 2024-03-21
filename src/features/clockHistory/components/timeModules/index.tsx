/*
    Author: Torjus A.M
    Component that updates and calculates the time modules for the employees clock history.
    Work pr weekly basis.
*/
import React, { FC, useEffect } from 'react';
import { Employee } from '../../../../lib/employee';
import FleksSalary from './fleksSalary';
import { useWorkIntervalContext } from '../../../../context/workIntervalContext';
import { formatInterval } from '../../services/formatInterval';
import { ClockHistoryData } from '../../../../lib/types';
import styles from '../clockHistory.module.css';
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface TimeModulesProps {
    employee: Employee;
    data: Array<ClockHistoryData>;
}

const TimeModules: FC<TimeModulesProps> = ({ employee, data, }) => {
    // Hook fetches this weeks total work interval, updates each clock in/out. 
    const { workTimeData, isLoading } = useWorkIntervalContext();
    
    return (
        <div className={styles.timeModulesContainer}>
            <div className={`${styles.timeModules}`} style={{ marginRight: '1.5rem' }}>
                <h1>Arbeidstid Uke {moment().week()}</h1>
                <h2>
                    {/* Time text: displays - or formatted time */}
                    {isLoading || !workTimeData
                        ? <div className={styles.loading}></div>
                        : (workTimeData && workTimeData.length > 0 && workTimeData[0].sum
                            ? formatInterval(workTimeData[0].sum)
                            : '00t 00m')
                    }
                </h2>
            </div>
            <FleksSalary employee={employee} data={data}/>
        </div>
    );
};

export default TimeModules;