/*
    Author: Torjus A.M
    Small component for when the employee has no upcoming shifts.
*/
import React, {FC} from "react";
import Umbrella from "../../../assets/umbrella.svg";
import styles from './shiftList.module.css';

const NoShifts: FC = () => {

    return (
        <>
            <hr/>
            <div className={styles.noShiftsContainer}>
                <div className={styles.iconContainer}>
                    <Umbrella className={styles.relaxIcon}/>
                </div>
                <h2>Du har ingen kommende vakter.</h2>
            </div>
        </>
    );
};

export default NoShifts