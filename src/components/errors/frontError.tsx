/**
 * @file components for employee select error screen
 * shows an image and has a button to take you back to homepage
 * @module Error
 * @Author Ask I.P Aspholm
 */
import React from 'react';
import Styles from './error.module.css';
import {useRouter} from 'next/router';

const FrontError: React.FC = () => {
    const router = useRouter()
    return (
        <div className={Styles.frontErrorContainer}>
            <div className={Styles.errorImager}>
                <img className={Styles.frontErrorImg} src="/errorWarning.png" alt="sorry we could not load this image"/>
            </div>
            <div className={Styles.errorText1}> Error 404</div>
            <div className={Styles.errorText2}> an error occurred whilst trying to find employees</div>
            <div>
                <button className={Styles.frontErrorBtn} onClick={() => router.push('/')}>retry</button>
            </div>
        </div>
    );
};

export default FrontError;