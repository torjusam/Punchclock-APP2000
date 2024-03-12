/*
    Author: Torjus A.M
    This component is the "Stemplingsklokke" on the personal page.
    It keeps track of current clock-in time and status and allows the user to clock in and out.
*/
import React, { useEffect, FC, useState } from 'react';
import { Employee } from '../../lib/employee';
import Clock from '../../assets/clock.svg';
import styles from '../../components/employeePage/employeePageLayout.module.css';
import ClockInOutButton from './components/clockInOutButton';
import PunchClockTimeDisplay from './components/punchClockTimeDisplay';
import { useEmployeeTimer } from './hooks/useEmployeeTimer';
import moment from 'moment';
import 'moment/locale/nb';
// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface PunchClockProps {
    employee: Employee;
}

const PunchClock: FC<PunchClockProps> = ({ employee }) => {
    const { timer, lastCheckOut } = useEmployeeTimer(employee);
    /* Passes a shared loading state for a seamless transition to a skeleton-loading style
       after button press, indicating an ongoing check operation. */
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={`${styles.module} ${styles.h2}`}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{ background: '#1BDA0A' }}>
                    <Clock className={styles.icon} />
                </div>
                <h1 className={styles.headerText}>Stemplingsklokke</h1>
            </div>
            <hr />
            <div className={styles.moduleContent}>
                <PunchClockTimeDisplay timer={timer} employee={employee} isLoading={isLoading} />
            </div>
            <ClockInOutButton employee={employee} setIsLoading={setIsLoading} />
        </div>
    );
};

export default PunchClock;