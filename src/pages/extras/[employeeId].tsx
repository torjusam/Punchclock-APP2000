/*
    Author: Torjus A.M
    Used to set a dynamic url (employee's id), wrap the context, and display the page content
*/
import React, {FC} from "react";
import ExtraPageData from "../../extra-Magnus_Ask_Kriss";
import EmployeeWorkDataProvider from "../../features/context/employeeWorkDataContext";
import {Employee} from "../../lib/types/employee";
import {useRouter} from "next/router";
import {useEmployeeContext} from "../../features/context/employeeContext";

const ExtraPage: FC = () => {
    const {employees} = useEmployeeContext();
    const router = useRouter();
    const {employeeId} = router.query; // extract employeeId from url

    if (!employees || !employeeId) {
        return <h1>Loading...</h1>;
    }
    // Convert employees array to a map for efficient lookup
    const employeesMap = new Map<number, Employee>(employees.map(emp => [emp.id, emp]));
    // Find the employee with the employeeId in the url
    const foundEmployee = employeesMap.get(Number(employeeId));

    if (!foundEmployee)
        return <h1>Employee not found</h1>

    // Render the ExtraPageData component with the found employee
    return (
        <EmployeeWorkDataProvider employee={foundEmployee}>
            <ExtraPageData employee={foundEmployee}/>
        </EmployeeWorkDataProvider>
    );
};

export default ExtraPage;