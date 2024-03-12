import React from 'react';
import CrudPageNav from '../layout/navbar/crudNav';
import EmployeeForm from './employeeForm';

const CrudPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <CrudPageNav />
            <EmployeeForm />
        </div>
    );
};

export default CrudPage;