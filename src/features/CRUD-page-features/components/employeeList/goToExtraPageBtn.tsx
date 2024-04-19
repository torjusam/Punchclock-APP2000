/*
    Author: Torjus A.M
    Used to redirect to the extra page
*/
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styles from './employeeList.module.css';
import Employee from "../../../../lib/types/employee";

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
