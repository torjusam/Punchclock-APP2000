// Author: Torjus A.M
import React, {FC} from 'react';
import styles from './navbars.module.css'
import HomeButton from "./homeButton";
import SignOutBtn from "../../authentication/signOutBtn";

const CrudPageNav: FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <HomeButton/>
            {/* Typically using h3 is not recommended because of screen readers, but its used here to target this text exclusively with style */}
            <h3 className={styles.pageName}>
                Dette er bare en testside som oppfyller innleveringskravene, og er ikke en del av det endelige
                produktet.
            </h3>
            <SignOutBtn/>
        </nav>
    );
};

export default CrudPageNav;