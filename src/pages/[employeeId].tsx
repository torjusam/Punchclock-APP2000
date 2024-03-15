//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAutoCloseTimer from '../hooks/useAutoCloseTimer';
import EmployeePageData from '../components/employeePage';
import { Employee } from '../lib/employee';
import { useEmployeeContext } from '../context/employeeContext';

const EmployeePage: React.FC = () => {
  const { employees } = useEmployeeContext()
  const router = useRouter();
  const { employeeId } = router.query;
  const [ employeeData, setEmployeeData ] = useState<Employee | undefined>();
  // Timer to close page after 25s, warning at 5s
  const showWarning = useAutoCloseTimer(25000, 5000);
  // Sets the page to the selected
  useEffect(() => {
    if (employeeId) {
      const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
      setEmployeeData(foundEmployee);
    }
  }, [employeeId, employees]);


  // Have to check null before being able to render
  if (!employeeData) {
    return <p style={{ color: 'white' }}>Loading...</p>;
  }

  return (
    <>
      <EmployeePageData employee={employeeData} />
      {showWarning && <div>Warning: This page will close in 5 seconds.</div>}
    </>
  );
}

export default EmployeePage;
