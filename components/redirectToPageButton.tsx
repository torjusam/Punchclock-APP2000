import React from 'react';
import { useRouter } from 'next/router';
import styles from '../lib/styles/Buttons.module.css';

interface GoToPersonalPageButtonProps {
  employeeId: number;
}

const GoToPersonalPageButton: React.FC<GoToPersonalPageButtonProps> = ({ employeeId }) => {
  const router = useRouter();

  const goToPersonalPage = () => {
    // use the router to navigate to the personal page with the employee ID
    router.push(`/${employeeId}`);
  };

  return (
    <button onClick={goToPersonalPage}
    className={styles.redirectButton}>
      Go to Personal Page
    </button>
  );
};

export default GoToPersonalPageButton;
