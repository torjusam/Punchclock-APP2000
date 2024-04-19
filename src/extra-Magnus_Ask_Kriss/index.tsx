/**
 * @file beskrivelse av filen
 * @module Extra
 * @Author Magnus A, Ask I.P.A
 */
import React, {FC} from "react";
import '@fontsource/lato';
import '@fontsource/public-sans';
import Employee from "../lib/types/employee";
import CrudPageNav from "../components/CRUD-page/crudNav";
import styles from "./extra.module.css";
import ExtraTable from "./extraTable";
import CreateShift from "../features/CRUD-page-features/components/createShift";

interface ExtraPageDataProps {
    employee: Employee;
}

const ExtraPageData: FC<ExtraPageDataProps> = ({employee}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem', overflow: 'auto'}}>
            <CrudPageNav/>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', padding: '2.3rem'}}>
                <div className={styles.extraContainer}>
                    <div>
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