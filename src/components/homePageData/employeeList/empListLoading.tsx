// Loading spinner
import React, {FC} from "react";
import {RotatingLines} from 'react-loader-spinner';
import styles from './employeeList.module.css';

const EmpListLoading: FC = () => {
    return (
        <div className={styles.employeeList}
             style={{
                 justifyContent: 'center',
                 paddingTop: '5rem',
             }}>
            <RotatingLines
                strokeColor={'#DCDCDC'}
                width={'8rem'}
            />
        </div>
    );
};

export default EmpListLoading;