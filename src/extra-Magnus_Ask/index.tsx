/**
 * @file that sets up the extra page
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
import ExtraEditShift from "./extraEditShift";

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
                        <ExtraEditShift/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraPageData;