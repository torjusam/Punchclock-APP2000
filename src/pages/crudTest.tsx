// Author: Torjus A.M
import React from "react";
import EmployeeForm from '../components/CRUD-page/employeeForm';
import NavContainer from "../components/Navs/navContainer";
import styles from "../styles/flexContainers.module.css";

const CrudPage: React.FC = () => {

    return (
        <div className={styles.generalContainer}>
            <NavContainer />
            <EmployeeForm />
        </div>
    );
}

export default CrudPage;