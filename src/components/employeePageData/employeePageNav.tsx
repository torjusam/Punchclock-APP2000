/**
 * @file Navbar of the employee-page
 * @module EmployeePage
 * @author Thomas H
 */
import React, {FC} from 'react';
import Pinicon from '../../assets/pinCode.svg';
import Notif from '../../assets/notif.svg';
import Helpico from '../../assets/helpIco.svg';
import Avatarico from '../../assets/avatar.svg';
import HomeButton from '../homeButton';
import {useSelectedEmployeeContext} from "../../features/context/selectedEmployeeContext";
import layout from '../../styles/navbar.module.css'
import styles from './employeePageNav.module.css'

const EmployeePageNav: FC = () => {
    // Get the selected employee as 'emp'
    const {selectedEmployee: emp} = useSelectedEmployeeContext();

    return (
        <nav className={layout.navBarContainer}>
            <HomeButton/>
            <div className={styles.profileContainer}>
                {/* Icons */}
                <div className={layout.iconContainer}>
                    <Pinicon className={styles.pinIcon}/>
                    <Notif className={layout.notifIcon}/>
                    <Helpico className={layout.helpIcon}/>
                </div>
                {emp && emp.profilePictureUrl ? (
                    <img
                        className={styles.avatar}
                        src={emp.profilePictureUrl}
                        alt="Profile Avatar"
                    />
                ) : (
                    // Show default icon if they don't have one, or an empty white circle while loading.
                    emp ? <Avatarico className={styles.avatar}/> : <div className={styles.avatar}/>
                )}
                {/* Employee name, or nothing while loading */}
                {emp &&
                    <h2 className={styles.employeeName}>{emp.name} </h2>}
            </div>
        </nav>
    );
};
export default EmployeePageNav;