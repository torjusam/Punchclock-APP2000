// Author: Torjus A.M
// firkant-komponent som brukes som en felles base for innholdet  
import React from 'react';
import styles from '../../lib/styles/square.module.css'

interface SquareProps {
  children: React.ReactNode; // kan ta imot alle typer komponenter
}

const Square: React.FC<SquareProps> = ({ children }) => {
  return (
    <div className={styles.squareOuterContainer}>
      <div className={styles.square}>
        {children}
      </div>
    </div>
  );
};

export default Square;