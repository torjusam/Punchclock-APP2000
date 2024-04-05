// Author: Torjus A.M
import React, {FC} from 'react';
import Pinicon from '../../../assets/pinCode.svg';
import Notif from '../../../assets/notif.svg';
import Helpico from '../../../assets/helpIco.svg';
import Avatarico from '../../../assets/avatar.svg';
import HomeButton from './homeButton';
import {useSelectedEmployeeContext} from "../../../context/selectedEmployeeContext";
import styles from './navbars.module.css'


const EmployeePageNav: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();

    if (!selectedEmployee)
        return <div>Loading...</div>;

    return (
        <nav className={styles.navBarContainer}>
            <HomeButton/>
            <div className={styles.profileContainer}>
                <div className={styles.iconContainer}>
                    <Pinicon className={styles.pinIcon}/>
                    <Notif className={styles.notifIcon}/>
                    <Helpico className={styles.helpIcon}/>
                </div>
                {selectedEmployee.profilePictureUrl ? (
                    // Render either employees profile picture or default avatar icon
                    <img className={styles.avatar} src={selectedEmployee.profilePictureUrl} alt="Profile Avatar"/>
                ) : (
                    <Avatarico className={styles.avatar}/>
                )}
                <h2 className={styles.employeeName}>{selectedEmployee.name}</h2>
            </div>
        </nav>
    );
};
export default EmployeePageNav;