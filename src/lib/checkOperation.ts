/* 
    Author: Torjus A.M
    Various functions for performing check operations on employees.
*/
const updateEmployeeStatus = (employees, employee) => {
  return employees.map(emp => {
      if (emp.id !== employee.id) {
          return emp;
      }
      return {
          ...emp,
          isClockedIn: !employee.isClockedIn,
          lastCheckIn: employee.isClockedIn ? emp.lastCheckIn : new Date(),
          lastCheckOut: employee.isClockedIn ? new Date() : emp.lastCheckOut,
      };
  });
};

const performCheckOperation = async (employee) => {
  const endpoint = employee.isClockedIn ? '/api/checkOut' : '/api/checkIn';
  const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employee }),
  });

  if (!response.ok) {
      throw new Error('Failed to perform check operation');
  }
};

// To-Do: Perform must update plannedwork, Balance, Fleksitid_Balance from employee



export const checkOperation = async (employee, employees, setEmployees) => {
  try {
      if (employee) {
          await performCheckOperation(employee);
          const updatedEmployees = updateEmployeeStatus(employees, employee);
          setEmployees(updatedEmployees);
      } else {
          throw new Error('Employee not found');
      }
  } catch (error) {
      console.error('Error performing check operation:', error);
      throw error;
  }
};