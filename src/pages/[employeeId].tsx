// Author: Torjus A.M
import EmployeePageData from '../components/employeePage';
import { useEmployeePageData } from '../hooks/useEmployeePageData';

const EmployeePage: React.FC = () => {
  const employeePageData = useEmployeePageData();

  if (!employeePageData) {
    return <p style={{ color: 'white' }}>Loading...</p>;
  }

  return (
    <>
      <EmployeePageData employee={employeePageData} />
    </>
  );
}

export default EmployeePage;
