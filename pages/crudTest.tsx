// Author: Torjus A.M
import React from "react";
import EmployeeForm from '../components/CRUD-page/employeeForm';
import GoToIndexButton from '../components/Buttons/redirectToIndexButton';
import Square from "../components/employeeTerminal/square";

const CrudPage: React.FC = () => {

    return (
        <Square>
            <EmployeeForm />
            <GoToIndexButton />
        </Square>
    );
}

export default CrudPage;