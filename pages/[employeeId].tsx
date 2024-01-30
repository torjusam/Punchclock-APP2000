//Author: Torjus A.M
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
    <div className="container mx-auto p-4">
      {/* Your existing navigation */}
      <nav className="bg-gray-800 p-4 text-white">
        {/* Your navigation content */}
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl font-bold mb-4">
          {`${employee.first_name} ${employee.surname}'s Page`}
        </h1>

        {/* Display other details about the employee */}
        {/* For example, a text field */}
        <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
          <label htmlFor="employeeTextField" className="block text-sm font-medium text-gray-700">
            Employee Details
          </label>
          <input
            type="text"
            id="employeeTextField"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter employee details"
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
