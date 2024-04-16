/*
  Author: Magnus A, Ask I.P.A
  Description:
*/
import React, {FC} from "react";
import '@fontsource/lato';
import '@fontsource/public-sans';
import {Employee} from "../lib/types/employee";
import ExtraTable from "./extraTable";
import ExtraEditShift from "./extraEditShift";
import CrudPageNav from "../components/CRUD-page/crudNav";
import styles from "./extra.module.css";

interface ExtraPageDataProps {
    employee: Employee;
}

const ExtraPageData: FC<ExtraPageDataProps> = ({employee}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <CrudPageNav/>
            <div style ={{display: 'flex', flexDirection: 'row', width: '100%', padding: '2.3rem'}}>
                <div className={styles.extraContainer}>
                    <div>
                        <ExtraTable employee={employee}/>
                    </div>
                </div>
                <div className={styles.extraContainer}>
                    <div>
                        <ExtraEditShift employee={employee}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraPageData;