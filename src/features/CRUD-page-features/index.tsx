/**
 * @file Main file for the CRUD page content.
 * @module CrudPage
 * @author Thomas H
 */
import React, {FC, useState} from 'react';
import Employee from "../../utils/employee";
import EmployeeList from "./components/employeeList/";
import CreateShift from "./components/createShift";

const CrudPageData: FC = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    return (
        <div style={{overflowY: "auto", overflowX: "hidden"}}>
            <EmployeeList setSelectedEmployee={setSelectedEmployee}/>
            <CreateShift employee={selectedEmployee}/>
        </div>
    );
};

export default CrudPageData;