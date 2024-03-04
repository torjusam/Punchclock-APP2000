//Author: Torjus A.M
import React, { FC } from "react"
import { useRouter } from 'next/router';
import HelpIco from '../../lib/assets/svg/helpIco.svg'
import Clock from "./clock"
import styles from "./leftContent.module.css"

// Component of all the items on the left side of the screen. Used in /pages/_app.tsx
const LeftContent: FC = () => {
    const router = useRouter();

    // Help button goes to CRUD page
    const handleHelpClick = () => { router.push('/crudTest') };

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