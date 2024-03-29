// ErrorComponent.tsx
import React from 'react';
import {useRouter} from "next/router";
import Styles from "./errors/error.module.css";
import {ResError} from "../lib/types/types";

interface ErrorComponentProps {
    error: ResError;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error}) => {
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
