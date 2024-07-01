// Employee cards
import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Employee from '../../../../utils/employee';
import LastCheckTime from './lastCheckTime';
import AvatarIcon from "../../../../assets/avatar.svg";
import styles from './employeeCard.module.css';

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee: emp}) => {
    const router = useRouter();
    // When a card is selected, the user is redirected to their page. The employees ID is the page url path.
    const onSelect = () => router.push(`/${emp.id}`);

    return (
        // Border styled conditionally, based on employees clocked in status.
        <div className={`${styles.employeeCardContainer} ${emp.isClockedIn && styles.isClockedIn}`} onClick={onSelect}>
            {/* Render either employees profile pic, or the stock avatar icon */}
            {emp.profilePictureUrl ? (
                <img
                    className={styles.profilePicture}
                    src={emp.profilePictureUrl}
                    alt="Avatar"
                />
            ) : (
                <AvatarIcon className={styles.profilePicture}/>
            )}
            <div className={styles.infoContainer}>
                <span className={styles.employeeName}>{emp.name}</span>
                <LastCheckTime employee={emp}/>
            </div>
        </div>
    );
};

export default EmployeeCard