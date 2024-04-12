/*
    Author: Torjus A.M
    Component displays fleks salary module, uses hook to fetch and then update display. Fleks saldo.
*/
import React, {FC} from 'react';
import {formatInterval} from '../../services/formatInterval';
import useFleksSalary from '../../hooks/useFleksSalary';
import styles from './timeModules.module.css';
import {useSelectedEmployeeContext} from '../../../../context/selectedEmployeeContext';

const FleksSalary: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();
    const {fleksSalary, isLoading} = useFleksSalary(selectedEmployee);

    return (
        <div className={styles.timeModules}>
            <h1 style={{color: '#0DB714'}}>Fleks saldo</h1>
            {isLoading ? (
                <h2 style={{color: '#0DB714'}}>00m 00s</h2>
            ) : (
                fleksSalary.map((item, index) => (
                    <h2 key={index} style={{color: '#0DB714'}}>
                        {formatInterval(item.fleksitid_balance)}
                    </h2>
                ))
            )}
        </div>
    );
};

export default FleksSalary;