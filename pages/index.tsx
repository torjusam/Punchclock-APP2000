// Author: Torjus A.M,
import React from 'react';
import EmployeeShiftTable from '../components/employeeTable/empoyeeShiftList';
import container from '../lib/styles/flexContainers.module.css';

export default function Page() {
  return (
    <div className={container.listOuterContainer}>
      <EmployeeShiftTable />
    </div>
  );
}