import React, {FC} from 'react';
import CrudPageNav from '../layout/navbar/crudNav';
import CreateShift from "../../features/CRUD-page-features/components/createShift";
import {useEmployeeContext} from "../../context/employeeContext";
import EmployeeManagement from './employeeManagement';

const CrudPage: FC = () => {
    // Placeholder to pass an employee
    const {employees} = useEmployeeContext();
    const employee = employees[1];

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <CrudPageNav/>
            <EmployeeManagement/>
           {/* <CreateShift employee={employee}/> */}
        </div>
    );
};

export default CrudPage;