//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PersonalPageData from '../components/employeePage/empPageData';
import { Employee } from '../lib/employee';
import { useEmployeeContext } from '../hooks/employeeContext';
import EmployeePageNav from '../components/employeePage/empNav';

const EmployeePage: React.FC = () => {
  const { employees, setEmployees } = useEmployeeContext()
  const router = useRouter();
  const { employeeId } = router.query;
  const [employeeData, setEmployeeData] = useState<Employee | undefined>();


  
  useEffect(() => {
    if (employeeId) {
      const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
      setEmployeeData(foundEmployee);
    }
  }, [employeeId, employees]);

  if (!employeeData) {
    return <p style={{ color: 'white' }}>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <EmployeePageNav employee={employeeData} />
      <PersonalPageData employee={employeeData} />
    </div>
  );
}

export default EmployeePage;
