import React from 'react';
import {Employee} from '../../lib/employee';

interface EmployeeListItemProps {
    employee: Employee;
    onDelete: (id: number) => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee, onDelete}) => {
    return (
        <div>
            <span>{employee.name}</span>
            {/* add annet relevant data her */}
            <button onClick={() => onDelete(employee.id)}>Delete</button>
        </div>
    );
};

export default EmployeeListItem;