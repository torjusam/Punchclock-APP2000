import React from "react";
import { fetchEmployeesWithSetShifts } from "../lib";
import { EmployeeShiftInfo } from '../lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

const EmployeeShiftTable = ({ employeeShiftList }: { employeeShiftList: EmployeeShiftInfo[] }) => {
    return (
         <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Surname</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {employeeShiftList.map((employeeShift, index) => (
              <EmployeeShiftTableRow key={index} {...employeeShift} />
            ))}
          </tbody>
        </table>
      );
    };

    const EmployeeShiftTableRow = ({ 
        firstname,
        surname,
        shiftStart,
        shiftEnd 
    }:EmployeeShiftInfo) => {
        return (
          <tr>
            <td>{firstname}</td>
            <td>{surname}</td>
            {/* <td>{shiftStart.toString()}</td> */}
            {/* <td>{shiftEnd.toString()}</td> */}
          </tr>
        );
      };

export default EmployeeShiftTable;
