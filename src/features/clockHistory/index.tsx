/**
 * @file Defines the layout and content of the "Stemplingshistorikk" module.
 * @module ClockHistory
 * @Author Torjus A.M
 */
import React, {FC} from 'react';
import ClockCheck from '../../assets/clockCheck.svg';
import TimeModules from './components/timeModules';
import ClockHistoryTable from "./components/clockHistoryTable";
import layout from '../../components/employeePageData/employeePageLayout.module.css';

const ClockHistory: FC = () => {
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
            <TimeModules/>
            <ClockHistoryTable/>
        </div>
    );
};

export default ClockHistory;