/*
    Author: Torjus A.M
    This component is the "Stemplingsklokke" module on the personal page.
*/
import React, {FC} from 'react';
import Clock from '../../assets/clock.svg';
import styles from '../../components/employeePageData/employeePageLayout.module.css';
import ClockInOutButton from './components/clockInOutButton';
import PunchClockTimer from "./components";


const PunchClock: FC = () => {
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
                <PunchClockTimer/>
            </div>
            <ClockInOutButton/>
        </div>
    );
};

export default PunchClock;