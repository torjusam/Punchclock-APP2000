/**
 * @file Button used to navigate to the extra page.
 * @module Extra
 * @memberof CrudPage
 * @author Thomas H
 */
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styles from './employeeList.module.css';
import Employee from "../../../../utils/employee";

interface ExtraPageButtonProps {
    employee: Employee;
}

const ExtraPageButton: FC<ExtraPageButtonProps> = ({employee}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/extras/${employee.id}`);
    };

    return (
        <button
            className={`${styles.button} ${styles.editButton}`}
            onClick={handleClick}>
            <h1>Ekstra-side</h1>
        </button>
    );
};

export default ExtraPageButton;
