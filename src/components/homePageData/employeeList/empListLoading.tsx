/**
 * @file Displays a loading spinner.
 * @module EmployeeList
 * @memberof Homepage
 * @description Uses the rotating lines loader from react-loader-spinner library.
 * @author Torjus A.M
 */
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