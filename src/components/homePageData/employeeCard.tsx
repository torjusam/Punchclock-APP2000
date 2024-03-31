/*
  Author: Thomas H, Torjus A.M
  "Blueprint" for each employee card, including selection logic to redirect to the employees page.
  Takes employee objects and returns a div styled as a card.
*/
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import {Employee} from '../../lib/types/employee';
import LastCheckTime from './lastCheckTime';
import styles from './employeeList.module.css';
import '@fontsource/public-sans';
import Avatarico from "../../assets/avatar.svg";

// Takes a type employee as parameter
interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const router = useRouter();

    // When a card is selected, the user is redirected to their page. The employees ID is the page url path.
    const onSelect = () => {
        router.push(`/${employee.id}`);
    };

    return (
        // Outer div is styled conditionally based on if the employee is clocked in or not.
        <div className={`${styles.employeeCardContainer} ${employee.isClockedIn && styles.isClockedIn}`}
             onClick={onSelect}>
            {employee.profilePictureUrl ? (
                // Render either employees profile picture or default avatar icon
                <img className={styles.profilePicture} src={employee.profilePictureUrl} alt="Profile Avatar"/>
            ) : (
                <Avatarico className={styles.profilePicture}/>
            )}
            <div className={styles.infoContainer}>
                <span className={styles.employeeName}>{employee.name}</span>
                <LastCheckTime employee={employee}/>
            </div>
        </div>
    );
};

export default EmployeeCard