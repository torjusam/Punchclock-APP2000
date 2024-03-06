// Author: Torjus A.M
import React, { useState, ChangeEvent } from 'react';
import { Employee } from '../../lib/employee';
import styles from '../../styles/navbars.module.css'

interface EmployeePageNavProps {
    employee: Employee;
}
const EmployeePageNav: React.FC<EmployeePageNavProps> = ({ employee }) => {
    const avatar = employee.profilePictureUrl ? employee.profilePictureUrl : './avatar.svg';

    return (
        <nav className={styles.navBarContainer}>
            <h1>EmployeePageNav</h1>
            <div className={styles.profileContainer}>
                <img className={styles.avatar} src={avatar} />
                <h3 className={styles.employeeName}>{employee.name}</h3>
            </div>
        </nav>
    );
};

export default EmployeePageNav;