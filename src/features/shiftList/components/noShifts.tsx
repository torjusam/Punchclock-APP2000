// Author: Torjus A.M
import React, {FC} from "react";
import Umbrella from "../../../assets/umbrella.svg";
import styles from './shiftList.module.css';

const NoShifts: FC = () => {

    return (
        <>
            <hr style={{marginTop: '0.5rem'}}/>
            <div className={styles.temporaryContainer}>
                <div className={styles.iconContainer}>
                    <Umbrella className={styles.relaxIcon}/>
                </div>
                <h2>Du har ingen kommende vakter.</h2>
            </div>
        </>
    );
};

export default NoShifts