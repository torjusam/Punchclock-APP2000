//Author: Torjus A.M
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../lib/styles/Buttons.module.css';


const GoToIndexButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button onClick={handleClick}
      className={styles.redirectButton}>
      Go to Homepage
    </button>
  );
};

export default GoToIndexButton;
