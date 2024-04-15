/*
    Author: Torjus A.M
    Component displaying the weekly worktime module. Arbeidstid Uke 1-52, 10m 00s.
*/
import React from 'react';
import {useEmployeeWorkDataContext} from "../../../context/employeeWorkDataContext";
import {formatInterval} from '../../services/formatInterval';
import moment from 'moment';
import styles from './timeModules.module.css';

const WorkTimeSalary = () => {
    const {balance, isBalanceLoading} = useEmployeeWorkDataContext();

    return (
        <div className={`${styles.timeModules}`} style={{marginRight: '1.5rem'}}>
            <h1>Arbeidstid Uke {moment().week()}</h1>
            {/* If loading, display loading div, else display either '00m 00s' or the formatted balance */}
            {isBalanceLoading ? (
                <div className={styles.loading}/>
            ) : balance && balance[0].sum ? (
                <h2>{formatInterval(balance[0].sum)}</h2>
            ) : (
                <h2>00m 00s</h2>
            )}
        </div>
    );
};

export default WorkTimeSalary;