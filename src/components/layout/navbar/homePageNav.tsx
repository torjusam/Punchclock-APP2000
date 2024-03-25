// Author: Torjus A.M
import React from 'react';
import SearchBar from '../../../features/searchBar';
import Notif from '../../../assets/notif.svg';
import Helpico from '../../../assets/helpIco.svg';
import styles from './navbars.module.css'
import SignOutBtn from '../../authentication/signOutBtn';

const FrontPageNav: React.FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <SearchBar />
            <div className={styles.iconContainer}>
                <SignOutBtn >
                    <Notif className={styles.notifIcon}/>
                </SignOutBtn>
                <Helpico className={styles.helpIcon} />
            </div>
        </nav>
    );
};

export default FrontPageNav;