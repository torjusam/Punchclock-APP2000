/*
    Author: Torjus A.M
    Responsible for defining the layout and content of the "Stemplingshistorikk" module.
*/
import React, {FC} from 'react';
import {Employee} from '../../lib/types/employee';
import ClockCheck from '../../assets/clockCheck.svg';
import TimeModules from './components/timeModules';
import ClockHistoryTable from "./components/clockHistoryTable";
import layout from '../../components/employeePageData/employeePageLayout.module.css';

interface ClockHistoryProps {
    employee: Employee;
}

const ClockHistory: FC<ClockHistoryProps> = ({employee}) => {
    return (
        // Module layout
        <div className={layout.clockHistoryContainer}>
            <div className={layout.moduleHeader}>
                <div className={`${layout.iconContainer}`} style={{padding: '0.57em'}}>
                    <ClockCheck className={`${layout.icon} ${layout.clockHistoryIcon}`}/>
                </div>
                <h1>Stemplingshistorikk</h1>
            </div>
            <hr/>
            <TimeModules employee={employee}/>
            <ClockHistoryTable employee={employee}/>
        </div>
    );
};

export default ClockHistory;