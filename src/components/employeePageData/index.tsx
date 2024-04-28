/**
 * @file Defines layout of the employees personal page, and dictates wether to load or not.
 * @module EmployeePage
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import styles from './employeePageLayout.module.css';
import EmployeePageNav from './employeePageNav';
import PunchClock from '../../features/clock-operation';
import ShiftList from '../../features/shiftList'
import ClockHistory from '../../features/clockHistory';

const EmployeePageData: FC = () => {

    return (
        <div className={styles.personalPageContainer}>
            <EmployeePageNav/>
            <div className={styles.personalPage}>
                <div className={styles.outerModuleContainer}>
                    <PunchClock/>
                    <ShiftList/>
                </div>
                <ClockHistory/>
            </div>
        </div>
    );
}

export default EmployeePageData;