/*
    Author: Torjus A.M
    Component that updates and calculates the time modules for the employees clock history.
    Work pr weekly basis.
*/
import React, { FC, useEffect } from 'react';
import { Employee } from '../../../../lib/employee';
import FleksSalary from './fleksSalary';
import useWorkTime from '../../hooks/useWorkTime';
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
    const { workTimedata, isLoading } = useWorkTime(employee);

        // Calculate isWorkTimeReached and set employee balance.
        useEffect(() => {
            if (workTimedata && workTimedata.length > 0 && workTimedata[0].sum) {
                const weekTime = moment.duration(workTimedata[0].sum);
                // Set the employees balance to the total work time this week, in ISO format (moment can read it).
                employee.balance = weekTime.toISOString();
                const plannedwork = moment.duration(employee.PlannedWork);
                employee.isWorkTimeReached = weekTime.asHours() > plannedwork.asHours();
            }
        }, [workTimedata, employee]);

    return (
        <div className={styles.timeModulesContainer}>
            <div className={`${styles.timeModules}`} style={{ marginRight: '1.5rem' }}>
                <h1>Arbeidstid Uke {moment().week()}</h1>
                <h2>
                    {/* Time text: displays - or formatted time */}
                    {isLoading || !workTimedata
                        ? <div className={styles.loading}></div>
                        : (workTimedata && workTimedata.length > 0 && workTimedata[0].sum
                            ? formatInterval(workTimedata[0].sum)
                            : '00t 00m')
                    }
                </h2>
            </div>
            <FleksSalary employee={employee} data={data}/>
        </div>
    );
};

export default TimeModules;