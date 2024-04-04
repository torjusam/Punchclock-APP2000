import React, {FC} from "react";
import styles from "../employeeList/employeeList.module.css";
import {useEmployeeContext} from "../../../../context/employeeContext";

const CreateEmployee: FC = () => {
    const {setEmployees} = useEmployeeContext();
    const handleClick = () => {
        // TODO: Create employee
        // setEmployees(prevEmployees => [...prevEmployees, {}]);
    }

    return (
        <div className={styles.createButtonContainer}>
            <button
                className={styles.createButton}
                onClick={handleClick}
            >
                Create New Employee
            </button>
        </div>
    )
}
export default CreateEmployee;