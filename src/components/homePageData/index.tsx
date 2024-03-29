/* 
    Author: Torjus A.M, Ask I.P Aspholm
    Responsible for setting up the layout of the frontpage and exports it.
*/
import React, {FC} from 'react';
import EmployeeList from './employeeList';
import FrontPageNav from '../layout/navbar/homePageNav';
import FrontError from '../errors/frontError';
import ErrorBoundary from '../errors/ErrorBoundary';


const FrontPage: FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <FrontPageNav/>
            <ErrorBoundary fallback={<FrontError/>}>
                <EmployeeList/>
            </ErrorBoundary>
        </div>
    );
};

export default FrontPage;