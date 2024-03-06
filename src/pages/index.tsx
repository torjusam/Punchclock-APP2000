// Author: Torjus A.M,
import React from 'react';
import EmployeeListDisplay from '../components/frontPageTable/employeeTable';
import FrontPageNav from '../components/frontPageTable/navBarFrontpage';

export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <FrontPageNav />
      <EmployeeListDisplay />
    </div>
  );
}