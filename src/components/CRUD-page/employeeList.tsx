import React from 'react';
import EmployeeListItem from './employeeListItem';
import styles from './employeeList.module.css';
import {Employee} from "../../lib/types/employee";

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({employees, onEdit, onDelete}) => {
    return (
        <div className={styles.employeeList}>
            <h2>Liste Over Ansatt</h2>
            <hr className={styles.separator}/>
            {employees.map(employee => (
                <EmployeeListItem
                    key={employee.id}
                    employee={employee}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default EmployeeList;