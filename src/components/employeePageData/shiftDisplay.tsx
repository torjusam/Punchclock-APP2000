/*
  Author: Torjus A.M
  Responsible for displaying the specific shifts of an employee. Works as a blueprint for each shift card.
  To-Do: Implement a way to expand the shift card to show more details. Selection logic.
*/
import React, {FC} from 'react';
import {Shift} from "../../lib/types/types";
import styles from './shiftList.module.css';
import moment from "moment/moment";
import Expand from "../../assets/expand.svg";

// Takes a type employee as parameter
interface ShiftProps {
    shift: Shift;
}

const ShiftDisplay: FC<ShiftProps> = ({shift}) => {

    return (
        <div className={styles.shiftItemContainer}>
            <div className={styles.shiftDateContainer}>
                <h1>{moment(shift.start).format('DD')}</h1>
                <h2>{moment(shift.start).format('ddd')}</h2>
            </div>
            <div className={styles.shiftItem}>
                <div className={styles.shiftTime}>
                    {`${moment(shift.start).format('LT')} - ${moment(shift.end).format('LT')}`}
                </div>
                <div className={styles.shiftExpandIcon}>
                    <Expand className={styles.expandIcon}/>
                </div>
            </div>
        </div>
    );
};

export default ShiftDisplay;