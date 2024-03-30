/*
    Author: Thomas H, Torjus A.M
    This component is displays the employee-cards in a table on the frontpage.
    It uses the custom employeeContext hook to access the array of employees and map
    over it, rendering each employee as an employee card.
*/
import React, {FC} from 'react';
import EmployeeCard from './employeeCard';
import {useEmployeeContext} from '../../context/employeeContext';

import ErrorComponent from "../errors/errorComponent";
import styles from './employeeList.module.css';

const EmployeeList: FC = () => {
    // Fetch the employees from the context. The list is updated anytime the searchbar or employee list is updated.
    const {sortedEmployees, error, loading} = useEmployeeContext();

    if (loading)
        // return <EmployeeCardLoading amount={4}/>;
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