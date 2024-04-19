/**
 * @file Used to set the employee, wrap the context, start the autoCloseTimer, and display the page content
 * @module EmployeePage
 * @author Torjus A.M
 */
import EmployeePageData from '../components/employeePageData';
import {FC} from "react";
import SelectedEmployeeProvider from "../features/context/selectedEmployeeContext";
import useAutoCloseTimer from "../hooks/useAutoClosePage";
import {useEmployeePageData} from "../hooks/useEmployeePageData";

const EmployeePage: FC = () => {
    // Close page after 35 seconds
    useAutoCloseTimer(35)
    const employee = useEmployeePageData();

    return (
        <SelectedEmployeeProvider employee={employee}>
            <EmployeePageData/>
        </SelectedEmployeeProvider>
    );
}

export default EmployeePage;