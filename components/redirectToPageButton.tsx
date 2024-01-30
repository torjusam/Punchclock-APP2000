import React from 'react';
import { useRouter } from 'next/router';

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
    <button onClick={goToPersonalPage}>
      Go to Personal Page
    </button>
  );
};

export default GoToPersonalPageButton;
