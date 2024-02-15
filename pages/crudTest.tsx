//Author: Torjus A.M
import React from "react";
import EmployeeForm from '../components/CRUD-page/employeeForm';
import GoToIndexButton from '../components/Buttons/redirectToIndexButton';

const CrudPage: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <EmployeeForm />
            <GoToIndexButton />
            </div>
            );
}

export default CrudPage;