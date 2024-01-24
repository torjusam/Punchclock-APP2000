// Author: Torjus A.M
'use client';
import React, { useEffect, useState } from 'react';
import { EmployeeShiftInfo } from '../lib/definitions';
import { formatDateTime } from '../lib/dateUtils';
import EmployeeListDisplay from '../components/employeeListData';

const EmployeeShiftTable: React.FC = () => {
  const [employeeShiftInfo, setEmployeeShiftInfo] = useState<EmployeeShiftInfo[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getEmployeesWithSetShifts');
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setEmployeeShiftInfo(result.data); // update state
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // empty dependency array ensures the effect runs only once after the initial render

  return (
    <div className="EmployeeShiftTable">
      {employeeShiftInfo.length > 0 ? (
       <EmployeeListDisplay employeeShiftInfo={employeeShiftInfo} />
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeShiftTable;
