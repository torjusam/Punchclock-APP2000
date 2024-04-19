/*
    Author: Torjus A.M
    This file sets shift for the employee.
*/

import Employee from "../../../lib/types/employee";
import {differenceInHours} from "date-fns";
import {Shift} from "../../../lib/types/types";

export const setShift = async (employee: Employee, description: string, start: Date, end: Date, setErrorMsg) => {
    if (start > end) {
        throw new RangeError("Start dato kan ikke være før sluttdato!");
    } else if (differenceInHours(end, start) > 24) {
        throw new RangeError("Vakt kan ikke vare mer enn 24 timer!");
    }
    const shift: Shift = {
        description: description,
        start: start.toISOString(),
        end: end.toISOString()
    };
    try {
        await performPost(employee, shift);
    } catch (error) {
        setErrorMsg(error.message);
    }
}

const performPost = async (employee: Employee, shift: Shift) => {
    const response = await fetch('/api/crudExtra/setShift', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({employee, shift}),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw Error(response.statusText);
    }
};