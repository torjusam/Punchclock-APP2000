/*  
    Author: Torjus A.M
    Responsible for defining the layout of the employees personal page,
    aswell as wrapping the data with context providers.

*/
import React, {FC} from 'react';
import styles from './employeePageLayout.module.css';
import EmployeePageNav from './employeePageNav';
import PunchClock from '../../features/clock-operation';
import ShiftList from '../../features/shiftList'
import ClockHistory from '../../features/clockHistory';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import EmployeeWorkDataProvider from "../../context/employeeWorkDataContext";

const EmployeePageData: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();

    if (!selectedEmployee)
        return <div>Loading...</div>;

    return (
        <div className={styles.personalPageContainer}>
            <EmployeePageNav/>
            {/* Context for employee's work-related data*/}
            <EmployeeWorkDataProvider employee={selectedEmployee}>
                <div className={styles.personalPage}>
                    <div className={styles.outerModuleContainer}>
                        <PunchClock/>
                        <ShiftList employee={selectedEmployee}/>
                    </div>
                    <ClockHistory employee={selectedEmployee}/>
                </div>
            </EmployeeWorkDataProvider>
        </div>
    );
}

export default EmployeePageData;