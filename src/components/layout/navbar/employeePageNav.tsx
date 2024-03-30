// Author: Torjus A.M
import React, {FC} from 'react';
import {Employee} from '../../../lib/types/employee';
import Pinicon from '../../../assets/pinCode.svg';
import Notif from '../../../assets/notif.svg';
import Helpico from '../../../assets/helpIco.svg';
import Avatarico from '../../../assets/avatar.svg';
import HomeButton from './homeButton';
import '@fontsource/public-sans';
import styles from './navbars.module.css'

interface EmployeePageNavProps {
    employee: Employee;
}

const EmployeePageNav: FC<EmployeePageNavProps> = ({employee}) => {

    return (
        <nav className={styles.navBarContainer}>
            <HomeButton/>
            <div className={styles.profileContainer}>
                <div className={styles.iconContainer}>
                    <Pinicon className={styles.pinIcon}/>
                    <Notif className={styles.notifIcon}/>
                    <Helpico className={styles.helpIcon}/>
                </div>
                {employee.profilePictureUrl ? (
                    // Render either employees profile picture or default avatar icon
                    <img className={styles.avatar} src={employee.profilePictureUrl} alt="Profile Avatar"/>
                ) : (
                    <Avatarico className={styles.avatar}/>
                )}
                <h2 className={styles.employeeName}>{employee.name}</h2>
            </div>
        </nav>
    );
};
export default EmployeePageNav;