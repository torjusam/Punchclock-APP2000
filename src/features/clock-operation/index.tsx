/*
    Author: Torjus A.M
    This component is the "Stemplingsklokke" on the personal page.
    It keeps track of current clock-in time and status and allows the user to clock in and out.
*/
import React, {FC, useState} from 'react';
import {Employee} from '../../lib/types/employee';
import Clock from '../../assets/clock.svg';
import styles from '../../components/employeePageData/employeePageLayout.module.css';
import ClockInOutButton from './components/clockInOutButton';
import PunchClockTimeDisplay from './components/punchClockModule';
import {useEmployeeTimer} from './hooks/useEmployeeTimer';
import moment from 'moment';
import 'moment/locale/nb';
// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface PunchClockProps {
    employee: Employee;
}

const PunchClock: FC<PunchClockProps> = ({employee}) => {
    const {timer, lastCheckOut} = useEmployeeTimer(employee);
    /* Passes a shared loading state for a seamless transition to a skeleton-loading style
       after button press, indicating an ongoing check operation. */
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div className={`${styles.module} ${styles.h2}`}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{background: '#1BDA0A'}}>
                    <Clock className={styles.icon}/>
                </div>
                <h1>Stemplingsklokke</h1>
            </div>
            <hr/>
            <div className={styles.moduleContent}>
                <PunchClockTimeDisplay timer={timer} employee={employee} isLoading={isLoading}
                                       errorMessage={errorMessage}/>
            </div>
            <ClockInOutButton employee={employee} isLoading={isLoading} setIsLoading={setIsLoading}
                              setErrorMessage={setErrorMessage}/>
        </div>
    );
};

export default PunchClock;