// Author: Torjus A.M
import React, {FC} from "react";
import {RotatingLines} from 'react-loader-spinner';
import styles from './shiftList.module.css';

const Loading: FC = () => {

    return (
        <>
            <hr style={{marginTop: '0.5rem'}}/>
            <div className={styles.temporaryContainer}>
                <RotatingLines
                    strokeColor={'#0A98FF'}
                    width={'4rem'}
                />
                <h2>Henter vakter... Vennligst vent</h2>
            </div>
        </>
    );
};

export default Loading;