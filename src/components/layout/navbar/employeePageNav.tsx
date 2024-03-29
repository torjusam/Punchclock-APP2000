// Author: Torjus A.M
import React, {FC} from 'react';
import {Employee} from '../../../lib/types/employee';
import Pinicon from '../../../assets/pinCode.svg';
import Notif from '../../../assets/notif.svg';
import Helpico from '../../../assets/helpIco.svg';
import styles from './navbars.module.css'
import HomeButton from './homeButton';

interface EmployeePageNavProps {
    employee: Employee;
}

const EmployeePageNav: FC<EmployeePageNavProps> = ({employee}) => {
    const avatar = employee.profilePictureUrl ? employee.profilePictureUrl : './avatar.svg';

    return (
        <nav className={styles.navBarContainer}>
            <HomeButton/>
            <div className={styles.profileContainer}>
                <div className={styles.iconContainer}>
                    <Pinicon className={styles.pinIcon}/>
                    <Notif className={styles.notifIcon}/>
                    <Helpico className={styles.helpIcon}/>
                </div>
                <img className={styles.avatar} src={avatar}/>
                <h3 className={styles.employeeName}>{employee.name}</h3>
            </div>
        </nav>
    );
};

export default EmployeePageNav;