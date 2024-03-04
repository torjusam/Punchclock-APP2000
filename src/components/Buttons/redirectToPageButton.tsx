// Author: Torjus A.M
import React from 'react';
import { useRouter } from 'next/router';
import { Employee } from '../../lib/employee';
import styles from '../../styles/Buttons.module.css';

interface RedirectToPageButtonProps {
  employee: Employee | null;
}

const RedirectToPageButton: React.FC<RedirectToPageButtonProps> = ({ employee }) => {
  const router = useRouter();

  /* Must check for null value at top of component, as all logic below throws erros if employee can be null.
  probably better ways of doing this but not biggest priority */
  if (!employee) {
    return (
      <button className={`${styles.buttonBase} ${styles.disabledButton}`}>
        <img className={`${styles.icon} ${styles.iconDisabled}`} style={{ maxWidth: '3em', marginRight: '0.7em' }} src="/stockAvatar.png" alt="avatar" />
        Personlig side
      </button>
    )
  }

  const goToPersonalPage = () => {
    // Use the router to navigate to the personal page with the employee ID
    router.push(`/${employee.id}`);
  };

  const buttonClass = employee.isClockedIn ? styles.clockOut : styles.clockIn;

  return (
    <button onClick={goToPersonalPage} className={`${styles.buttonBase} ${styles.activeButton}`}>
      <img className={`${styles.icon} ${styles.iconActive}`} style={{ maxWidth: '3em', marginRight: '0.7em' }} src="/stockAvatar.png" alt="avatar" />
      Personlig side
    </button>
  );
};

export default RedirectToPageButton;
