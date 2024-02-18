// Author: Torjus A.M
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../lib/styles/Buttons.module.css';

interface GoToPersonalPageButtonProps {
  employeeId: number | undefined;
}

const GoToPersonalPageButton: React.FC<GoToPersonalPageButtonProps> = ({ employeeId }) => {
  if (!employeeId) {
    return null;
  }

  const router = useRouter();

  const goToPersonalPage = () => {
    // use the router to navigate to the personal page with the employee ID
    router.push(`/${employeeId}`);
  };

  return (
    <button onClick={goToPersonalPage}>
      Gå til personlig side
    </button>
  );
};

export default GoToPersonalPageButton;
