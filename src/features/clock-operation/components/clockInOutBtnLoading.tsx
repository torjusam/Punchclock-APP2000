import {button} from "@material-tailwind/react";
import styles from "./punchClock.module.css";
import ArrowIn from "../../../assets/arrowIn.svg";
import React, {FC} from "react";

const ClockBtnLoading: FC = () => {
    return (
        <button
            className={styles.buttonContainer}
            style={{backgroundColor: '#B0B0B0'}}
            disabled={true}
        >
            <div className={styles.iconContainer}>
                <ArrowIn className={styles.icon}/>
            </div>
            Stemple ...
        </button>
    )
}

export default ClockBtnLoading;