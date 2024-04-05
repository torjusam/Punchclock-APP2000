// Author: Torjus A.M
import EmployeePageData from '../components/employeePageData';
import {FC} from "react";
import SelectedEmployeeProvider from "../context/selectedEmployeeContext";
import useAutoCloseTimer from "../hooks/useAutoClosePage";

const EmployeePage: FC = () => {
    // Close page after 35 seconds
    useAutoCloseTimer(35)

    return (
        <SelectedEmployeeProvider>
            <EmployeePageData/>
        </SelectedEmployeeProvider>
    );
}

export default EmployeePage;