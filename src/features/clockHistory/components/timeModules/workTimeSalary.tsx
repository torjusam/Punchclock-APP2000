/*
    Author: Torjus A.M
    Component displaying the weekly worktime module. Arbeidstid Uke 1-52.
*/
import React from 'react';
import {useWorkIntervalContext} from '../../../../context/workIntervalContext';
import {formatInterval} from '../../services/formatInterval';
import styles from '../clockHistory.module.css';
import '@fontsource/lato';
import '@fontsource/public-sans';
import moment from 'moment';

const WorkTimeSalary = () => {
    /* 
        Uses context to fetch worktime data instead of local state, 
        because the same data is used in calculating overtime during clockOut.
    */
    const {workTimeData, isLoading} = useWorkIntervalContext();

    return (
        <div className={`${styles.timeModules}`} style={{marginRight: '1.5rem'}}>
            <h1>Arbeidstid Uke {moment().week()}</h1>
            <h2>
                {isLoading || !workTimeData
                    ? <div className={styles.loading}></div>
                    : (workTimeData && workTimeData.length > 0 && workTimeData[0].sum
                        ? formatInterval(workTimeData[0].sum)
                        : '00t 00m')
                }
            </h2>
        </div>
    );
};

export default WorkTimeSalary;