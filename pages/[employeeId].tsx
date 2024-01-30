import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EmployeeList } from '../lib/employeeStorage';
import { Employee } from '../lib/definitions';

const EmployeePage: React.FC = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);


  useEffect(() => {
    if (employeeId) {
      const employeeData = EmployeeList.getEmployeeById(Number(employeeId));
  
      // check if the employeeData is defined before setting the state
      if (employeeData) {
        setEmployee(employeeData);
      }
    }
  }, [employeeId]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center text-4xl font-bold">
      <h1>{`${employee.first_name} ${employee.surname}'s Page`}</h1>
      {/* Display other details about the employee */}
    </div>
  );
};

export default EmployeePage;
