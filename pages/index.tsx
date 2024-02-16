// Author: Torjus A.M,
import React from 'react';
import EmployeeShiftList from '../components/frontPageTable/employeeShiftList';
import ButtonsBelowList from '../components/Buttons/buttonsBelowTable';
import container from '../lib/styles/flexContainers.module.css';

export default function Page() {
  return (
    <div className={container.listOuterContainer}>
      <EmployeeShiftList />
      <ButtonsBelowList />
    </div>
  );
}