// Author: Torjus A.M
import EmployeePageData from '../components/employeePageData';
import {useEmployeePageData} from '../hooks/useEmployeePageData';
import useAutoCloseTimer from '../hooks/useAutoClosePage';

const EmployeePage: React.FC = () => {
    const employeePageData = useEmployeePageData();
    useAutoCloseTimer();

    if (!employeePageData) {
        return <p style={{color: 'white'}}>Loading...</p>;
    }

    return (
        <>
            <EmployeePageData employee={employeePageData}/>
        </>
    );
}

export default EmployeePage;
