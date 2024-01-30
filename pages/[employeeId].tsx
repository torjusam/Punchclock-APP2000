//Author: Torjus A.M
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EmployeeList } from '../lib/employeeStorage';
import { Employee } from '../lib/definitions';
import EmployeeForm from '../components/employeeForm';
import GoToIndexButton from '../components/redirectToIndexButton';

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
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl font-bold mb-4">
          {`${employee.first_name} ${employee.surname}'s Page`}
        </h1>
        <EmployeeForm />
        <GoToIndexButton />
      </div>
  );
}

export default EmployeePage;
