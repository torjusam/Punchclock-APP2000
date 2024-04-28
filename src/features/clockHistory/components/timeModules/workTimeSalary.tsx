/**
 * @file Component displaying the weekly worktime module. E.G: Arbeidstid Uke 1-52, 10m 00s.
 * @module ClockHistory
 * @author Torjus A.M
 */
import React from 'react';
import {formatInterval} from '../../services/formatInterval';
import moment from 'moment';
import styles from './timeModules.module.css';
import {useSelectedEmployeeContext} from "../../../context/selectedEmployeeContext";

const WorkTimeSalary = () => {
    // Get the balance, or undefined if loading
    const {selectedEmployee: {balance} = {}} = useSelectedEmployeeContext();
    const displayBalance = balance ? formatInterval(balance) : '00m 00s';

    return (
        <div className={styles.timeModules} style={{marginRight: '1.5rem'}}>
            <h1>Arbeidstid Uke {moment().week()}</h1>
            <h2>{displayBalance}</h2>
        </div>
    );
};

export default WorkTimeSalary;