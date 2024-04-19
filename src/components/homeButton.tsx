/**
 * @file Button that redirects to the homepage: "<- Tilbake"
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Expand from '../assets/expand.svg';
import styles from './homeButton.module.css';

// Button to redirect to the homepage
const HomeButton: FC = () => {
    const router = useRouter();

    // Goes to the homepage using an empty router: '/ '
    const handleClick = () => {
        router.push('/');
    };

    return (
        <button className={styles.homeBtn} onClick={handleClick}>
            <Expand className={styles.icon}/>
            <h1>Tilbake</h1>
        </button>
    );
};

export default HomeButton;
