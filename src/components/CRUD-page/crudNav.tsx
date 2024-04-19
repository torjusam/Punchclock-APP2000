/**
 * @file Navbar for the CRUD-page. Contains a home button and a sign-out button.
 * @module CRUD-page
 * @author Thomas H
 */
import React, {FC} from 'react';
import HomeButton from "../homeButton";
import SignOutBtn from "../authentication/signOutBtn";
import layout from '../../styles/navbar.module.css'
import styles from './crudNav.module.css'

const CrudPageNav: FC = () => {
    return (
        <nav className={layout.navBarContainer}>
            <HomeButton/>
            <h2 className={styles.header}>
                Dette er bare en testside, og er ikke en del av det endelige produktet som skal leveres til Visma.
            </h2>
            <SignOutBtn/>
        </nav>
    );
};

export default CrudPageNav;