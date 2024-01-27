//Author: Torjus A.M
export type Employee = {
    id: number;
    first_name: string;
    surname: string;
    isClockedIn: Boolean;
}

export type Shift = {
    id: number;
    description: string;
    shiftStart: Date;
    shiftEnd: Date;
}

export type Checkin_Checkout = {
    id: number;
    employee_id: number;
    checkin: Date;
    checkout: Date;
}

export type Shift_employee = {
    id: number;
    shift_id: number;
    employee_id: number;
}

export type EmployeeShiftInfo = {
    employee: Employee;
    shiftStart: Date;
    shiftEnd: Date;
}