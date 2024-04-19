/**
 * @file Responsible for rendering each employee in the list of employees and logic for selecting, de-selecting and deleting employees.
 * @module CrudPage
 * @author Thomas H
 */
import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './employeeList.module.css';
import Employee from "../../../../utils/employee";
import {deleteEmployee} from "../../services/deleteEmployee";
import {useEmployeeContext} from "../../../context/employeeContext";
import ExtraPageButton from "./goToExtraPageBtn";

interface EmployeeListItemProps {
    employee: Employee;
    setSelectedEmployee: Dispatch<SetStateAction<Employee | null>>;
}

const EmployeeListItem: FC<EmployeeListItemProps> = ({employee, setSelectedEmployee}) => {
    const {setEmployees} = useEmployeeContext();

    // Author: Torjus A.M
    const onSelect = () => {
        setSelectedEmployee(employee);
    }

    // Author: Torjus A.M
    const onDelete = async () => {
        await deleteEmployee(employee);
        setEmployees(prevEmployees => prevEmployees.filter(e => e.id !== employee.id));
    }

    // Author: Thomas H
    return (
        <div
            className={styles.employeeListItem}
            onClick={onSelect}>
            <div className={styles.employeeDetails}>
                <span className={styles.employeeName}>{employee.name}</span>
            </div>
            <ExtraPageButton employee={employee}/>
            <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={onDelete}>Delete
            </button>
        </div>
    );
};

export default EmployeeListItem;