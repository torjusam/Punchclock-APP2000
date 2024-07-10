// Layout of content on left side of the screen.
import React, {FC} from "react"
import {useRouter} from 'next/router';
import HelpIco from '../../assets//helpIco.svg'
import Clock from "./clock"
import styles from "./layout.module.css"
import Image from "next/image";
import logo from "../../assets/placeholderLogo.png";
import '@fontsource/dm-sans';

const LeftContent: FC = () => {
    const router = useRouter();

    // Help button goes to CRUD page
    const handleHelpClick = () => {
        router.push('/extras/crud')
    };

    // Logo goes to index page
    const handleLogoClick = () => {
        router.push('/')
    };

    return (
        <>
            <Image
                className={styles.logo}
                src={logo}
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