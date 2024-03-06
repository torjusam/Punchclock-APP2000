// Author: Torjus A.M
import React from "react";
import EmployeeForm from '../components/CRUD-page/employeeForm';
import CrudPageNav from '../components/CRUD-page/navBarCrud';

const CrudPage: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CrudPageNav />
            <EmployeeForm />
        </div>
    );
}

export default CrudPage;