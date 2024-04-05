/*
    Author: Torjus A.M
    Component displaying the weekly worktime module. Arbeidstid Uke 1-52, 10m 00s.
*/
import React from 'react';
import {formatInterval} from '../../services/formatInterval';
import styles from '../clockHistory.module.css';
import '@fontsource/lato';
import '@fontsource/public-sans';
import moment from 'moment';
import {useEmployeeWorkDataContext} from "../../../../context/employeeWorkDataContext";

const WorkTimeSalary = () => {
    const {balance} = useEmployeeWorkDataContext();

    return (
        <div className={`${styles.timeModules}`} style={{marginRight: '1.5rem'}}>
            <h1>Arbeidstid Uke {moment().week()}</h1>
            {/* Either loading or the balance */}
            {balance ? (
                <h2>{formatInterval(balance[0].sum)}</h2>
            ) : (
                <div className={styles.loading}></div>
            )}
        </div>
    );
};

export default WorkTimeSalary;