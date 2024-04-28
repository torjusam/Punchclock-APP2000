/**
 * @file Error component for error handling
 * @module Error
 * @author Ask I.P.A, Torjus A.M
 */
import React, {FC} from 'react';
import {useRouter} from "next/router";
import Styles from "./error.module.css";
import {ResError} from "../../utils/types";

interface ErrorComponentProps {
    error: ResError;
}

const ErrorComponent: FC<ErrorComponentProps> = ({error}) => {
    const router = useRouter()
    return (
        <div className={Styles.frontErrorContainer}>
            <div className={Styles.errorImager}>
                <img className={Styles.frontErrorImg} src="/errorWarning.png" alt="sorry we could not load this image"/>
            </div>
            <h1>{error.status}</h1>
            <h2>{error.message}</h2>
            <div>
                <button className={Styles.frontErrorBtn} onClick={() => router.push('/')}>retry</button>
            </div>
        </div>
    );
};

export default ErrorComponent;
