// Author: Torjus A.M
import React from 'react';
import { useRouter } from 'next/router';
import { Employee } from '../../lib/employee';
import styles from '../../lib/styles/Buttons.module.css';

interface RedirectToPageButtonProps {
  employee: Employee | null;
}

const RedirectToPageButton: React.FC<RedirectToPageButtonProps> = ({ employee }) => {
  const router = useRouter();

  /* Must check for null value at top of component, as all logic below throws erros if employee can be null.
  probably better ways of doing this but not biggest priority */
  if (!employee) {
    return (
      <button disabled className={styles.disabledButton}>
        <img className={styles.icon} src="/clocking.png" alt="clocking-icon" />
        Stemple
      </button>
    )
  }

  const goToPersonalPage = () => {
    // Use the router to navigate to the personal page with the employee ID
    router.push(`/${employee.id}`);
  };

  const buttonClass = employee.isClockedIn ? styles.clockOut : styles.clockIn;

  return (
    <button onClick={goToPersonalPage} className={`${styles.button} ${buttonClass}`}>
      Gå til personlig side
    </button>
  );
};

export default RedirectToPageButton;
