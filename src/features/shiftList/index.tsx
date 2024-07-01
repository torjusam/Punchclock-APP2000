// List of shifts for an employee
import React, {FC} from "react";
import RenderShiftList from "./components/shiftList";
import ShiftsIcon from "../../assets/shifts.svg";
import layout from "../../components/employeePageData/employeePageLayout.module.css";
import styles from "./components/shiftList.module.css";

const ShiftList: FC = () => {
    return (
        <div className={`${layout.module} ${styles.module}`}>
            <div className={`${layout.moduleHeader} ${styles.moduleHeader}`}>
                <div className={`${layout.iconContainer}`} style={{padding: '0.57em'}}>
                    <ShiftsIcon className={layout.icon}/>
                </div>
                <h1>Vaktliste</h1>
            </div>
            <div className={styles.moduleContent}>
                <RenderShiftList/>
            </div>
        </div>
    )
}

export default ShiftList;