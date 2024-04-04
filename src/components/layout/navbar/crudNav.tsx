// Author: Torjus A.M
import React, {FC} from 'react';
import styles from './navbars.module.css'
import HomeButton from "./homeButton";

const CrudPageNav: FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <HomeButton/>
            {/* Typically using h3 is not recommended because of screen readers, but its used here to target this text exclusively with style */}
            <h3 className={styles.pageName}>Denne siden er en test-side for å dekke kravene for CRUD, og er ikke med i
                det siste
                produktet</h3>
        </nav>
    );
};

export default CrudPageNav;