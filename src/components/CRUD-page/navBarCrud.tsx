// Author: Torjus A.M
import React, { useState, ChangeEvent, FC } from 'react';
import styles from '../../styles/navbars.module.css'

const CrudPageNav: FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <h1>HomePageNav</h1>
            {/*<SearchInput value={searchTerm} onChange={handleSearchChange} />*/}
        </nav>
    );
};

export default CrudPageNav;