/*
    Author: Thomas H, Torjus A.M
*/
import React, {FC, useState} from 'react';
import Employee from "../../lib/types/employee";
import EmployeeList from "./components/employeeList/employeeList";
import CreateShift from "./components/createShift";
import styles from './components/crudPagaData.module.css';

const CrudPageData: FC = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    return (
        <div className={styles.container}>
            <EmployeeList setSelectedEmployee={setSelectedEmployee}/>
            <CreateShift employee={selectedEmployee}/>
        </div>
    );
};

export default CrudPageData;