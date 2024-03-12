// Author: Torjus A.M
import React, { useState, ChangeEvent } from 'react';
import styles from './navbars.module.css'

const FrontPageNav: React.FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <h1>HomePageNav</h1>
            {/*<SearchInput value={searchTerm} onChange={handleSearchChange} />*/}
        </nav>
    );
};

export default FrontPageNav;