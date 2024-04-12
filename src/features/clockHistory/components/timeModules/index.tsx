/*
    Author: Torjus A.M
    Main component for the two time modules above the clockhistorytable.
    TODO: use selectedEmployee context > prop passing
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