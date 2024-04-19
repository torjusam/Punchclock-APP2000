/*
    Author: Thomas H
    Maps over the employees array, and renders an EmployeeListItem for each employee in a list.
*/
import React, {Dispatch, FC, SetStateAction} from 'react';
import EmployeeListItem from './employeeListItem';
import styles from './employeeList.module.css';
import Employee from "../../../../lib/types/employee";
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
            {/*<CreateEmployee/>*/}
        </div>
    );
};

export default EmployeeList;