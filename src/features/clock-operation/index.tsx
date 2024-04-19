/**
 * @file ClockHistory - "Stemplingsklokke" module.
 * @module ClockOperation
 * @memberof EmployeePage
 * @Author Torjus A.M
 */
import React, {FC} from 'react';
import ClockIcon from '../../assets/clock.svg';
import ClockInOutButton from './components/clockInOutButton';
import PunchClockTimer from "./components/punchClockTimer";
import styles from '../../components/employeePageData/employeePageLayout.module.css';

const PunchClock: FC = () => {
    return (
        <div className={`${styles.module} ${styles.h2}`}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{background: '#1BDA0A'}}>
                    <ClockIcon className={styles.icon}/>
                </div>
                <h1>Stemplingsklokke</h1>
            </div>
            <hr/>
            <div className={styles.moduleContent}>
                <PunchClockTimer/>
            </div>
            <ClockInOutButton/>
        </div>
    );
};

export default PunchClock;