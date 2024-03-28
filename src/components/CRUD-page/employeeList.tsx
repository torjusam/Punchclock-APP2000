import React from 'react';
import EmployeeListItem from './employeeListItem';
import {Employee} from '../../lib/employee';

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
    return (
      <div>
        <h2>Ansatt Liste</h2>
        {employees.map(employee => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  };
  
  export default EmployeeList;