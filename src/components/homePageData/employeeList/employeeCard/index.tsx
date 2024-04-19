/**
 * @file Component defines *blueprint* of an employee card. Uses the employee object's info to render the card.
 * @module EmployeeList
 * @memberof Homepage
 * @author Thomas H, Torjus A.M
 */
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Employee from '../../../../utils/employee';
import LastCheckTime from './lastCheckTime';
import AvatarIcon from "../../../../assets/avatar.svg";
import styles from './employeeCard.module.css';

// Takes a type employee as parameter
interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const router = useRouter();

    // When a card is selected, the user is redirected to their page. The employees ID is the page url path.
    const onSelect = () => {
        router.push(`/${employee.id}`);
    }

    return (
        // Border styled conditionally, based on employees clocked in status.
        <div className={`${styles.employeeCardContainer} ${employee.isClockedIn && styles.isClockedIn}`}
             onClick={onSelect}>
            {/* Render either employees profile pic, or the stock avatar icon */}
            {employee.profilePictureUrl ? (
                <img
                    className={styles.profilePicture}
                    src={employee.profilePictureUrl}
                    alt="Avatar"
                />
            ) : (
                <AvatarIcon className={styles.profilePicture}/>
            )}
            <div className={styles.infoContainer}>
                <span
                    className={styles.employeeName}>
                    {employee.name}
                </span>
                <LastCheckTime employee={employee}/>
            </div>
        </div>
    );
};

export default EmployeeCard