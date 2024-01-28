//Author: Torjus A.M
import { Employee } from "./definitions";
import { fetchEmployees, fetchEmployeesWithSetShiftsData } from "./dataAcess";

//employee manager list
let employeeList: Employee[] = [];

/*function to initialize the employeeList. 
use at start of application (or whenever need refresh): await initializeEmployeeList(); 
fetches the entire employeelist aswell as the employees with set shifts, then merges them*/
export async function initializeEmployeeList(): Promise<void> {
    const employees = await fetchEmployees();
    const employeesWithShifts = await fetchEmployeesWithSetShiftsData();

    employeesWithShifts.forEach((employeeWithShift) => {
        //find matching index
        const existingEmployeeIndex = employees.findIndex((employee) => employee.id === employeeWithShift.id);

        if (existingEmployeeIndex !== -1) {
            // update existing employee with shift information
            employees[existingEmployeeIndex] = { ...employees[existingEmployeeIndex], ...employeeWithShift };
        } else {
            // add new employee with shift information
            employees.push({ ...employeeWithShift });
        }
    });
    employeeList = employees;
}

export const getEmployees = (): Employee[] => employeeList;

export const getEmployeeById = (employeeId: number): Employee | undefined => {
    return employeeList.find((employee) => employee.id === employeeId);
};

export const getEmployeesWithUpcomingShifts = (): Employee[] => {
    // filter employees with set shifts based on the presence of shiftStart and shiftEnd properties
    return employeeList.filter((employee) => employee.shiftStart && employee.shiftEnd);
};

export const setEmployees = (newEmployees: Employee[]): void => {
    employeeList = newEmployees;
};

/*function to update the clocked-in status of a specific employee.
This updates the entire employeeList[] when called on, not optimal but 
makes sure the list is consitent*/
export const updateEmployeeStatus = (employeeId: number, isClockedIn: boolean): void => {
    const updatedEmployees = employeeList.map((employee) =>
        employee.id === employeeId ? { ...employee, isClockedIn } : employee
    );
    setEmployees(updatedEmployees);
};
//because updateEmployeeStatus is called everytime a checkin or out is performed this will update correct information(i think)
export const getPresentEmployees = (): Employee[] => {
    // filter employees based on isClockedIn
    return employeeList.filter((employee) => employee.isClockedIn);
  };
  
  export const getNotPresentEmployees = (): Employee[] => {
    // filter employees based on isClockedIn 
    return employeeList.filter((employee) => !employee.isClockedIn);

  };

//function to update employees shift: if they get a new shift, add here?
//when shiftEnd passes current time, remove their shift?
//export const updateEmployeeShift()