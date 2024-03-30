/* 
    Author: Torjus A.M, Ask I.P Aspholm
    Responsible for setting up the layout of the frontpage and exports it.
*/
import React, {FC} from 'react';
import EmployeeList from './employeeList';
import FrontPageNav from '../layout/navbar/homePageNav';
import FrontError from '../errors/frontError';
import ErrorBoundary from '../errors/ErrorBoundary';
import styles from './employeeList.module.css';


const FrontPage: FC = () => {
    return (
        <div className={styles.homePageContainer}>
            <FrontPageNav/>
            <ErrorBoundary fallback={<FrontError/>}>
                <EmployeeList/>
            </ErrorBoundary>
        </div>
    );
};

export default FrontPage;