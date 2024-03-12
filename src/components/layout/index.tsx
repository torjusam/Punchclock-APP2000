/* 
    Author: Torjus A.M
    Main component for all pages. This component is the layout of the app, and is used in every page.
    It contains all the content on the left side of the screen.
*/
import React, { FC } from "react"
import { useRouter } from 'next/router';
import HelpIco from '../../assets//helpIco.svg'
import Clock from "./clock"
import styles from "./layout.module.css"

const LeftContent: FC = () => {
    const router = useRouter();

    // Help button goes to CRUD page
    const handleHelpClick = () => { router.push('/crud') };

    // Logo goes to index page
    const handleLogoClick = () => { router.push('/') };

    return (
        <>
            <img src="/vismalogo.png" alt="logo" className={styles.logo} onClick={handleLogoClick} />
            <Clock />
            <div className={styles.helpContainer} onClick={handleHelpClick}>
                <HelpIco className={styles.helpIco} alt="help" />
                <div className={styles.helpText}>Hjelp</div>
            </div>
        </>
    )
};

export default LeftContent