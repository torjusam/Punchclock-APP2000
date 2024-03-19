//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmployeePageData from '../components/employeePage';
import { Employee } from '../lib/employee';
import { useEmployeeContext } from '../context/employeeContext';
import moment from 'moment';

const EmployeePage: React.FC = () => {
  const { employees, setEmployees } = useEmployeeContext()
  const router = useRouter();
  const { employeeId } = router.query;
  const [employeeData, setEmployeeData] = useState<Employee | undefined>();

  useEffect(() => {
    if (employeeId) {
      const foundEmployee = employees.find((employee) => employee.id === Number(employeeId));
      // Initalizes employees dailyWorkTime ( 40 / 5 = 8 hours per day)
      if (foundEmployee) {
        const dailyWorkTime = moment.duration(foundEmployee.PlannedWork).asHours() / 5;
        foundEmployee.dailyWorkTime = dailyWorkTime;
      }
      setEmployeeData(foundEmployee);
    }
  }, [employeeId, employees]);

  if (!employeeData) {
    return <p style={{ color: 'white' }}>Loading...</p>;
  }

  return (
    <>
      <EmployeePageData employee={employeeData} />
    </>
  );
}

export default EmployeePage;
