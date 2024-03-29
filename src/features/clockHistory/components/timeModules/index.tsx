/*
    Author: Torjus A.M
    Main component for the two time modules above the clockhistorytable.
*/
import React, {FC} from 'react';
import {Employee} from '../../../../lib/types/employee';
import FleksSalary from './fleksSalary';
import WorkTimeSalary from './workTimeSalary';
import styles from '../clockHistory.module.css';

interface TimeModulesProps {
    employee: Employee;
}

const TimeModules: FC<TimeModulesProps> = ({employee}) => {
    return (
        <div className={styles.timeModulesContainer}>
            <WorkTimeSalary/>
            <FleksSalary employee={employee}/>
        </div>
    );
};

export default TimeModules;