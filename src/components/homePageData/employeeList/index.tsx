/**
 * @file This component is responsible for rendering a list of employee-cards in a table-like list.
 * @module EmployeeList
 * @memberof Homepage
 * @description Uses the employee-context to access the array of employees, map over it, rendering each employee as an employee card.
 * @Author Thomas H, Torjus A.M
 */
import React, {FC} from 'react';
import EmployeeCard from './employeeCard/';
import {useEmployeeContext} from '../../../features/context/employeeContext';
import ErrorComponent from "../../errors/errorComponent";
import styles from './employeeList.module.css';

const EmployeeList: FC = () => {
    // Fetch the employees from the context. The list is updated anytime the searchbar or employee list is updated.
    const {sortedEmployees, error, loading} = useEmployeeContext();

    if (loading)
        //  return <EmployeeCardLoading amount={4}/>;
        // TODO: setup placeholder.
        return <div>Loading...</div>;

    else if (error)
        return <ErrorComponent error={error}/>;

    return (
        <div className={styles.employeeList}>
            {sortedEmployees.length === 0 && <h2>Ingen ansatte matcher søket!</h2>}
            {sortedEmployees.map(employee => (
                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                />
            ))}
        </div>
    );
};

export default EmployeeList;