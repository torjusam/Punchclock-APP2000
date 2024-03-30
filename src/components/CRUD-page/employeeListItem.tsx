import React from 'react';
import {Employee} from '../../lib/employee';
import styles from './employeeListItem.module.css';

interface EmployeeListItemProps {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee, onEdit, onDelete}) => {
    return (
        <div className={styles.employeeListItem}>
            <div className={styles.employeeDetails}>
            <span className={styles.employeeName}>{employee.name}</span>
            </div>
            {/* Add mer info hvis nødvendig*/}
            <button className={`${styles.button} ${styles.editButton}`} onClick={() => onEdit(employee)}>Edit</button>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDelete(employee.id)}>Delete</button>
        </div>
    );
};

export default EmployeeListItem;