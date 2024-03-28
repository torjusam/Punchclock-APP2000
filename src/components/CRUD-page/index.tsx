import React, {FC} from 'react';
import CrudPageNav from '../layout/navbar/crudNav';
import EmployeeForm from '../../features/CRUD-page-features/components/employeeForm';
import CreateShift from "../../features/CRUD-page-features/components/createShift";
import {useEmployeeContext} from "../../context/employeeContext";


const CrudPage: FC = () => {
    // Placeholder to pass an employee
    const {employees} = useEmployeeContext();
    const employee = employees[1];

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <CrudPageNav/>
            <EmployeeForm/>
            <CreateShift employee={employee}/>
        </div>
    );
};

export default CrudPage;