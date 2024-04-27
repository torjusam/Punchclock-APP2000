/**
 * @file beskrivelse av filen
 * @module Extra
 * @author Magnus A, Ask I.P.A
 */
import React, {FC} from "react";
import '@fontsource/lato';
import '@fontsource/public-sans';
import Employee from "../utils/employee";
import CrudPageNav from "../components/CRUD-page/crudNav";
import styles from "./extra.module.css";
import ExtraTable from "./extraTable";
import CreateShift from "../features/CRUD-page-features/components/createShift";

interface ExtraPageDataProps {
    employee: Employee;
}

const ExtraPageData: FC<ExtraPageDataProps> = ({employee}) => {

    return (
        <div className={styles.extraPage}>
            <CrudPageNav/>
            <div className={styles.extraPageModuleContainer}>
                <div className={styles.extraContainer}>
                    <div className={styles.extraTableContainer}>
                        <ExtraTable employee={employee}/>
                    </div>
                </div>
                <div className={styles.extraContainer}>
                    <div>
                        <CreateShift/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraPageData;