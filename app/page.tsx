import React from "react"
import { fetchEmployeesWithSetShifts } from "./lib"
import { Suspense } from "react"
import Loading from "./ui/loading";
import EmployeeShiftTable from "./ui/tables";


export default async function Home() {
  const employeeShiftInfo = await fetchEmployeesWithSetShifts();
  
  return (
    <main>
      <h1>hello</h1>
      {/*Forfatter: Torjus A.M */
      /*Fallback kun for den diven*/}
      <div className="border: 5px solid red;">
        <Suspense fallback={<Loading/>}>
          <EmployeeShiftTable employeeShiftList={employeeShiftInfo} />
        </Suspense>

      </div>
    </main>
  )
}
