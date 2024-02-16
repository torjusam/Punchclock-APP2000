// Author: Torjus A.M
// Flytta knappene som skal være under tabellen til en annen klasse
import React from 'react';
import ClockInOutButton from './clockInOutButton';
import GoToPersonalPageButton from './redirectToPageButton';
import Link from 'next/link';
import Container from '../../lib/styles/flexContainers.module.css';

interface ButtonsProps {

}

const ButtonsBelowList: React.FC<ButtonsProps> = ({}) => {
  return (
    <div className={Container.buttonContainer}>
      <button>Hei</button>
    </div>
    ); 
}

export default ButtonsBelowList;