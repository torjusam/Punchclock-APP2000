/* 
    Author: Torjus A.M
    Main component for all pages. This component is the layout of the app, and is used in every page.
    It contains all the content on the left side of the screen.
*/
import React, {FC} from "react"
import {useRouter} from 'next/router';
import HelpIco from '../../assets//helpIco.svg'
import Clock from "./clock"
import styles from "./layout.module.css"
import Image from "next/image";
import vismaLogo from "../../assets/vismalogo.png";
import '@fontsource/dm-sans';

const LeftContent: FC = () => {
    const router = useRouter();

    // Help button goes to CRUD page
    // må oppdateres for å bruke server side authentication for å bli redirected til CRUD side via authorization token - midlertidig løsning for å accesse pin siden
    const handleHelpClick = () => {
        router.push('/auth/pin')
    };

    // Logo goes to index page
    const handleLogoClick = () => {
        router.push('/')
    };

    return (
        <>
            <Image className={styles.logo}
                   src={vismaLogo}
                   alt={"logo"}
                   onClick={handleLogoClick}
            />
            <Clock/>
            <div className={styles.helpContainer} onClick={handleHelpClick}>
                <HelpIco className={styles.helpIco}/>
                <div className={styles.helpText}>Hjelp</div>
            </div>
        </>
    )
};

export default LeftContent