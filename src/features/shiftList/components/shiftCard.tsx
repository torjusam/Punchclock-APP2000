/*
  Author: Torjus A.M
  Responsible for displaying the specific shifts of an employee. Works as a blueprint for each shift card.
*/
import React, {FC} from 'react';
import {Shift} from "../../../lib/types/types";
import styles from './shiftList.module.css';
import moment from "moment/moment";
import Expand from "../../../assets/expand.svg";

// Takes a type shift as parameter
interface ShiftCardProps {
    shift: Shift;
}

const ShiftCard: FC<ShiftCardProps> = ({shift}) => {

    const handleSelect = () => {
        // TODO: Expand selected shift. Show description, and who is assigned to the shift.
        return;
    }

    return (
        <div className={styles.shiftItemContainer}>
            <div className={styles.shiftDateContainer}>
                <h1>{moment(shift.start).format('DD')}</h1>
                <h2>{moment(shift.start).format('ddd')}</h2>
            </div>
            <div className={styles.shiftItem} onClick={handleSelect}>
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

export default ShiftCard;