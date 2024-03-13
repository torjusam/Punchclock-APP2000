// Author: Torjus A.M
import React, { useState, ChangeEvent } from 'react';
import styles from './navbars.module.css'
import SearchBar from '../../../features/searchBar';

const FrontPageNav: React.FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <SearchBar />
            <h1>HomePageNav</h1>
        </nav>
    );
};

export default FrontPageNav;