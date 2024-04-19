/**
 * @file Main component for the two time modules above the clockhistorytable.
 * @module ClockHistory
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import FleksSalary from './fleksSalary';
import WorkTimeSalary from './workTimeSalary';
import styles from './timeModules.module.css';

const TimeModules: FC = () => {
    return (
        <div className={styles.timeModulesContainer}>
            <WorkTimeSalary/>
            <FleksSalary/>
        </div>
    );
};

export default TimeModules;