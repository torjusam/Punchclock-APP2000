//Author: Torjus A.M
//Prototype placeholder
import React from 'react';
import { useState } from 'react';
import { createEmployee } from '../../../lib/dataAccess';

const EmployeeForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const handleEnterClick = async () => {
    try {
      const result = await createEmployee(firstName, surname);
      setResultMessage(result);
    } catch (error) {
      setResultMessage('Error creating employee');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md flex flex-col items-center">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* First Name Field */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-800"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ color: '#333', backgroundColor: '#f7f7f7' }}
          />
        </div>
  
        {/* Surname Field */}
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-800"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            style={{ color: '#333' }}
          />
        </div>
      </div>
  
      {/* Enter Button */}
      <button onClick={handleEnterClick}>
        Create Employee
      </button>
  
      {/* Display Result Message */}
      {resultMessage && <div className="mt-4 text-green-700">{resultMessage}</div>}
    </div>
  );
};

export default EmployeeForm;

