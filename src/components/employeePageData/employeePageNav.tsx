/**
 * @file Navbar of the employee-page
 * @module EmployeePage
 * @Author Thomas H
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
    const {selectedEmployee} = useSelectedEmployeeContext();

    if (!selectedEmployee)
        return <nav className={layout.navBarContainer}>Loading..</nav>;

    return (
        <nav className={layout.navBarContainer}>
            <HomeButton/>
            <div className={styles.profileContainer}>
                <div className={layout.iconContainer}>
                    <Pinicon className={styles.pinIcon}/>
                    <Notif className={layout.notifIcon}/>
                    <Helpico className={layout.helpIcon}/>
                </div>
                {selectedEmployee.profilePictureUrl ? (
                    // Render either employees profile picture or default avatar icon
                    <img
                        className={styles.avatar}
                        src={selectedEmployee.profilePictureUrl}
                        alt="Profile Avatar"
                    />
                ) : (
                    <Avatarico className={styles.avatar}/>
                )}
                <h2 className={styles.employeeName}>{selectedEmployee.name}</h2>
            </div>
        </nav>
    );
};
export default EmployeePageNav;