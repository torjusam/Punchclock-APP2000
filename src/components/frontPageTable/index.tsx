/* 
    Author: Torjus A.M
    Responsible for setting up the layout of the frontpage and exports it.
*/
import React from 'react';
import EmployeeListDisplay from './employeeTable';
import FrontPageNav from './navBarFrontpage';

const FrontPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <FrontPageNav />
            <EmployeeListDisplay />
        </div>
    );
};

export default FrontPage;