// Author: Torjus A.M
import React from 'react';
import {useRouter} from 'next/router';
import Expand from '../../../assets/expand.svg';
import styles from './navbars.module.css';

const HomeButton: React.FC = () => {
    const router = useRouter();

    // Goes to the homepage using an empty router: '/ '
    const handleClick = () => {
        router.push('/');
    };

    return (
        <button onClick={handleClick} className={styles.homeBtn}>
            <Expand className={styles.icon}/>
            <h1>Tilbake</h1>
        </button>
    );
};

export default HomeButton;
