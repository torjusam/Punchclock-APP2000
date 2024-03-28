// Author: Torjus A.M
import React, {FC } from 'react';
import styles from './navbars.module.css'
import HomeButton from "./homeButton";

const CrudPageNav: FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <HomeButton />
        </nav>
    );
};

export default CrudPageNav;