// Author: Torjus A.M
import React, { useEffect, useState } from 'react';
import { EmployeeShiftInfo } from '../lib/definitions';
import { formatDateTime } from '../lib/dateUtils';
import EmployeeListDisplay from '../components/employeeListData';

//component to fetch and render result of api call
const EmployeeShiftTable: React.FC = () => {
  const [employeeShiftInfo, setEmployeeShiftInfo] = useState<EmployeeShiftInfo[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //HTTP GET request
        const response = await fetch('/api/getEsWithSetShifts');
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
  
  //render component based on if there are any employees
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
