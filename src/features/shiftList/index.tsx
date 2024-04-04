/*
    Author: Torjus A.M, Thomas H
    Responsible for displaying the shifts of a specific employee.
    TODO: Hook for updating shifts?
*/
import React, {FC} from "react";
import {Employee} from "../../lib/types/employee";
import RenderShiftList from "./components/shiftList";
import '@fontsource/lato';
import '@fontsource/public-sans';
import layout from "../../components/employeePageData/employeePageLayout.module.css";
import Shifts from "../../assets/shifts.svg";
import styles from "./components/shiftList.module.css";

interface ShiftListProps {
    employee: Employee;
}

const ShiftList: FC<ShiftListProps> = ({employee}) => {

    return (
        <div className={`${layout.module} ${styles.module}`}>
            <div className={`${layout.moduleHeader} ${styles.moduleHeader}`}>
                <div className={`${layout.iconContainer}`} style={{padding: '0.57em'}}>
                    <Shifts className={layout.icon}/>
                </div>
                <h1>Vaktliste</h1>
            </div>
            <div className={styles.moduleContent}>
                <RenderShiftList employee={employee}/>
            </div>
        </div>
    )
}

export default ShiftList;