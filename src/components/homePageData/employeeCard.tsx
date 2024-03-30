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

// Takes a type employee as parameter
interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const router = useRouter();
    // Use either employees profile picture or a default avatar.
    const avatar = employee.profilePictureUrl ? employee.profilePictureUrl : './avatar.svg';

    // When a card is selected, the user is redirected to their page. The employees ID is the page url path.
    const onSelect = () => {
        router.push(`/${employee.id}`);
    };

    // Outer div is styled conditionally based on if the employee is clocked in or not.
    return (
        <div className={`${styles.employeeCardContainer} ${employee.isClockedIn && styles.isClockedIn}`}
             onClick={onSelect}>
            <img className={styles.profilePicture} src={avatar} alt="avatar"/>
            <div className={styles.infoContainer}>
                <span className={styles.employeeName}>{employee.name}</span>
                <LastCheckTime employee={employee}/>
            </div>
        </div>
    );
};

export default EmployeeCard