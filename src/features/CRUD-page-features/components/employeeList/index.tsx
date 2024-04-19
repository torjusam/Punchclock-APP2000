/**
 * @file Root for the list. Maps over the employees array and renders an EmployeeListItem for each employee in a list.
 * @module CrudPage
 * @author Thomas H
 * @Editors Torjus A.M
 */
import React, {Dispatch, FC, SetStateAction} from 'react';
import EmployeeListItem from './employeeListItem';
import styles from './employeeList.module.css';
import Employee from "../../../../utils/employee";
import {useEmployeeContext} from "../../../context/employeeContext";

interface EmployeeListProps {
    setSelectedEmployee: Dispatch<SetStateAction<Employee | null>>;
}

const EmployeeList: FC<EmployeeListProps> = ({setSelectedEmployee}) => {
    const {employees} = useEmployeeContext();

    return (
        <div className={styles.employeeList}>
            {employees.map(employee => (
                <EmployeeListItem
                    key={employee.id}
                    employee={employee}
                    setSelectedEmployee={setSelectedEmployee}
                />
            ))}
        </div>
    );
};

export default EmployeeList;