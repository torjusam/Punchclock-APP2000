/* 
    Author: Torjus A.M, Ask I.P Aspholm
    Responsible for setting up the layout of the homepage, and export it.
*/
import React, {FC} from 'react';
import EmployeeList from './employeeList';
import HomePageNav from './homePageNav';
import FrontError from '../errors/frontError';
import ErrorBoundary from '../errors/ErrorBoundary';
import styles from '../../styles/layout.module.css';

const HomepageData: FC = () => {
    return (
        <div className={styles.homePageContainer}>
            <HomePageNav/>
            <ErrorBoundary fallback={<FrontError/>}>
                <EmployeeList/>
            </ErrorBoundary>
        </div>
    );
};

export default HomepageData;