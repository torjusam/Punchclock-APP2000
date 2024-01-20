import React from 'react';
import './EmployeeList.css';

const EmployeeListItem = () => {
    return (
      <div className="employee-item">
        <div className="profile-container"></div> {/* Empty div for the profile picture */}
        <div className="info-container">
          <span className="employee-name">Name</span>
        </div>
      </div>
    );
  };
  
  export default EmployeeListItem;