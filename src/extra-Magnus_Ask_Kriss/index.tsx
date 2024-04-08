/*
  Author:
  Description:
*/
import React, {FC} from "react";
import '@fontsource/lato';
import '@fontsource/public-sans';
import {Employee} from "../lib/types/employee";
import ClockHistoryTable from "../features/clockHistory/components/clockHistoryTable";

interface ExtraPageDataProps {
    employee: Employee;
}

const ExtraPageData: FC<ExtraPageDataProps> = ({employee}) => {

    return (
        <>
            <ClockHistoryTable employee={employee}/>
        </>
    )
};

export default ExtraPageData;