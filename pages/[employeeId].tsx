//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GoToIndexButton from '../components/Buttons/redirectToIndexButton';
import { Employee } from '../lib/employee';
import Square from '../components/employeeTerminal/square';

const EmployeePage: React.FC = () => {
  const router = useRouter();
  const { employeeId } = router.query;


  useEffect(() => {
    if (employeeId) {
      const employeeData = (employee.id);
  
      // check if the employeeData is defined before setting the state
      if (employeeData) {
        setEmployee(employeeData);
      }
    }
  }, [employeeId]);

  if (!employee) {
    return <p style={{color:'white'}}>Loading...</p>;
  }

  return (
    <div>
      <GoToIndexButton />
    </div>
  );
}

export default EmployeePage;
