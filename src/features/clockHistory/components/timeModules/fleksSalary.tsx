/**
 * @file Component fetches the fleks salary for the selected employee and displays it.
 * @module ClockHistory
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import {formatInterval} from '../../services/formatInterval';
import useFleksSalary from '../../hooks/useFleksSalary';
import styles from './timeModules.module.css';
import {useSelectedEmployeeContext} from '../../../context/selectedEmployeeContext';

const FleksSalary: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();
    const {fleksSalary, isLoading} = useFleksSalary(selectedEmployee);

    return (
        <div className={styles.timeModules}>
            <h1 style={{color: '#0DB714'}}>Fleks saldo</h1>
            {isLoading ? (
                <h2 style={{color: '#0DB714'}}>00m 00s</h2>
            ) : (
                <h2 style={{color: '#0DB714'}}>
                    {formatInterval(fleksSalary)}
                </h2>
            )}
        </div>
    );
};

export default FleksSalary;