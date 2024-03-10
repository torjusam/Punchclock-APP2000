/*
    Author: Torjus A.M
    Component that updates and calculates the time modules for the 
    employees clock history.
*/
import React, { FC } from 'react';
import { ClockHistoryData } from '../../../lib/types';
import styles from './clockHistory.module.css';

interface TimeModulesProps {
    data: Array<ClockHistoryData>;
    isLoading: boolean;
}

const TimeModules: FC<TimeModulesProps> = ({ data, isLoading }) => {

    return (
        <div className={styles.timeModulesContainer}>
            <div className={`${styles.timeModules}`} style={{ marginRight: '1.5rem' }}>
                <h1>Arbeidstid</h1>
                <h2>23t 00m</h2>
            </div>
            <div className={styles.timeModules}>
                <h1 style={{ color: '#0DB714' }}>Fleks saldo</h1>
                <h2 style={{ color: '#0DB714' }}>23t 00m</h2>
            </div>
        </div>
    );
};

export default TimeModules;