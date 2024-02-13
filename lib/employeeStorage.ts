//Author: Torjus A.M
import { Employee } from "./definitions";
import { fetchEmployees, fetchEmployeesWithSetShiftsData } from "./dataAccess";

export class EmployeeManager {
    private employeeList: Employee[] = [];

    public async initializeEmployeeList(): Promise<void> {
        const employees = await fetchEmployees();
        const employeesWithShifts = await fetchEmployeesWithSetShiftsData();

        employeesWithShifts.forEach((employeeWithShift) => {
           
            //find matching index
            const existingEmployeeIndex = employees.findIndex(
                (employee) => employee.id === employeeWithShift.id
            );

            if (existingEmployeeIndex !== -1) {
                //update existing employee with shift information
                employees[existingEmployeeIndex] = {
                    ...employees[existingEmployeeIndex],
                    ...employeeWithShift,
                };
            } else {
                //add new employee with shift info
                employees.push({ ...employeeWithShift });
            }
        });
        this.employeeList = employees;
    }

    public getEmployees(): Employee[] {
        return this.employeeList;
    }

    public getEmployeeById(employeeId: number): Employee | undefined {
        return this.employeeList.find((employee) => employee.id === employeeId);
    }

    public getScheduledEmployees(): Employee[] {
        // filter employees based on the presence of shiftStart and shiftEnd properties
        return this.employeeList.filter(
            (employee) => employee.shiftStart && employee.shiftEnd
        );
    }

    /* This updates the entire employeeList[] when called on, not optimal but 
    makes sure the list is consitent*/
    public setEmployees(newEmployees: Employee[]): void {
        this.employeeList = newEmployees;
    }

    //function to update the clocked-in status of a specific employee.
    public updateEmployeeStatus(employeeId: number, isClockedIn: boolean): void {
        const employeeToUpdate = this.getEmployeeById(employeeId);

        if (employeeToUpdate) {
            employeeToUpdate.isClockedIn = isClockedIn;
            //immutabable update
            this.setEmployees([...this.employeeList]);
        }
    }

    /*because updateEmployeeStatus is called everytime a checkin or out is performed 
    this will update correct information(i think)*/
    public getPresentEmployees(): Employee[] {
        // filter employees based on isClockedIn
        return this.employeeList.filter((employee) => employee.isClockedIn);
    }

    public getAbsentEmployees(): Employee[] {
        // filter employees based on isClockedIn
        return this.employeeList.filter((employee) => !employee.isClockedIn);
    }

    //check clockedIn status
    public isEmployeeClockedIn(employee: Employee): boolean {
        return !!employee.isClockedIn;
    }
}

//singleton instance
export let EmployeeList = new EmployeeManager();