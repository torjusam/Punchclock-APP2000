/*
    Author: Torjus A.M
    Component that updates and calculates the time modules for the employees clock history.
    Work pr weekly basis. FleksitidSaldo total, hvordan
*/
import React, { FC } from 'react';
import { Employee } from '../../../lib/employee';
import useWorkTime from '../../timeModules/hooks/useWorkTime';
import styles from './clockHistory.module.css';
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface TimeModulesProps {
    employee: Employee;
}

const TimeModules: FC<TimeModulesProps> = ({ employee }) => {
    const { workTimedata, isLoading } = useWorkTime(employee);
    console.log(workTimedata);
    return (
        <div className={styles.timeModulesContainer}>
            <div className={`${styles.timeModules}`} style={{ marginRight: '1.5rem' }}>
                <h1>Arbeidstid Uke {moment().week()}</h1>
                {/* This horrible chunk of code sets value to '-' if theres no data for this week. 
                    Checks for hours, minutes and seconds and displays either for example: '00m 32s' or '01t 30m'. 
                    padStart() is used for adding leading 0's to the numbers.
                */}
                <h2>
                    {isLoading
                        ? 'Henter..'
                        : (workTimedata && workTimedata.length > 0 && workTimedata[0].sum
                            ? (workTimedata[0].sum.hours > 0
                                ? `${workTimedata[0].sum.hours.toString().padStart(2, '0')}t ${workTimedata[0].sum.minutes ? workTimedata[0].sum.minutes.toString().padStart(2, '0') + 'm' : '00m'}`
                                : (workTimedata[0].sum.minutes
                                    ? `${workTimedata[0].sum.minutes.toString().padStart(2, '0')}m ${workTimedata[0].sum.seconds ? workTimedata[0].sum.seconds.toString().padStart(2, '0') + 's' : '00s'}`
                                    : `${workTimedata[0].sum.seconds ? workTimedata[0].sum.seconds.toString().padStart(2, '0') + 's' : '00s'}`))
                            : '-')}
                </h2>
            </div>
            <div className={styles.timeModules}>
                <h1 style={{ color: '#0DB714' }}>Fleks saldo</h1>
                <h2 style={{ color: '#0DB714' }}>23t 00m</h2>
            </div>
        </div>
    );
};

export default TimeModules;