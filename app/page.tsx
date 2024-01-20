import React from "react"
import { Suspense } from "react"
import Loading from "./components/loading";
import EmployeeShiftTable from "./components/employeesWithSetShiftsTable";

export default function Home() {
  return (
    <main>
      <h1>hello</h1>
      <EmployeeShiftTable />
    </main>
  )
}
