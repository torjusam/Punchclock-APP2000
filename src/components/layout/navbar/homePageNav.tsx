// Author: Torjus A.M
import React, { useState, ChangeEvent } from 'react';
import SearchBar from '../../../features/searchBar';
import Notif from '../../../assets/notif.svg';
import Helpico from '../../../assets/helpIco.svg';
import styles from './navbars.module.css'

const FrontPageNav: React.FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <SearchBar />
            <div className={styles.iconContainer}>
                <Notif className={styles.notifIcon} />
                <Helpico className={styles.helpIcon} />
            </div>
        </nav>
    );
};

export default FrontPageNav;