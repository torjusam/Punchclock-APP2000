/**
 * @file This component is responsible for rendering a list of employee-cards in a table-like list.
 * @module EmployeeList
 * @memberof Homepage
 * @description Uses the employee-context to access the array of employees, map over it, rendering each employee as an employee card.
 * @author Thomas H, Torjus A.M
 */
import React, {FC} from 'react';
import EmployeeCard from './employeeCard/';
import {useEmployeeContext} from '../../../features/context/employeeContext';
import ErrorComponent from "../../errors/errorComponent";
import EmpListLoading from "./empListLoading";
import styles from './employeeList.module.css';

const EmployeeList: FC = () => {
    // Fetch the employees from the context. The list is updated anytime the searchbar or employee list is updated.
    const {sortedEmployees: employees, error, loading} = useEmployeeContext();

    if (loading)
        return <EmpListLoading/>;

    if (error)
        return <ErrorComponent error={error}/>;

    return (
        <div className={styles.employeeList}>
            {employees.length === 0 && <h2>Ingen ansatte matcher søket!</h2>}
            {employees.map(emp => (
                <EmployeeCard
                    key={emp.id}
                    employee={emp}
                />
            ))}
        </div>
    );
};

export default EmployeeList;