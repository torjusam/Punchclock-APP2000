/* 
    Author: Torjus A.M
    Component responsible for displaying the timer on the punchClock module.
*/
import React, {FC} from 'react';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import {useEmployeeWorkDataContext} from "../../context/employeeWorkDataContext";
import {formatTimer} from "../services/formatTimer";
import moment from 'moment';
import styles from './punchClock.module.css';

const PunchClockTimer: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();
    const {timer, isTimerLoading} = useEmployeeWorkDataContext();

    return (
        <div className={styles.timeDisplay}>
            {/* Either loading or the timer */}
            {isTimerLoading ? (
                <>
                    <div className={styles.line}></div>
                    <div className={`${styles.line} ${styles.w2}`}></div>
                </>
            ) : (
                timer >= 0 && (
                    <>
                        <h1>{formatTimer(timer)}</h1>
                        <h2>
                            {moment(selectedEmployee.lastCheckIn).isValid() ?
                                moment(selectedEmployee.lastCheckIn).format('LT') : '?'
                            } -
                            {/* Either "?" while clockin is active, or last checkout */}
                            {selectedEmployee.isClockedIn ? ' ?' :
                                (moment(selectedEmployee.lastCheckOut).isValid() ?
                                    moment(selectedEmployee.lastCheckOut).format(' LT') : ' ?')
                            }
                        </h2>
                    </>
                )
            )}
        </div>
    );
};

export default PunchClockTimer;