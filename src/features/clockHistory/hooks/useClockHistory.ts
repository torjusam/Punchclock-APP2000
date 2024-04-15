/*
    Author: Torjus A.M
    Custom hook for accessing the employees time clock history, and setting a state variable with it.
*/
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";
import {ClockHistoryData} from "../../../lib/types/types";
import {intervalToDuration} from "../../../utils/intervalToDuration";
import {useEmployeeWorkDataContext} from "../../context/employeeWorkDataContext";

const useClockHistory = (employee: Employee) => {
    const [clockHistoryData, setClockHistoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {setTimer} = useEmployeeWorkDataContext();

    useEffect(() => {
        setIsLoading(true);
        fetchClockHistoryData(employee);
    }, [employee]);

    const fetchClockHistoryData = async (employee: Employee) => {
        const result = await performFetch(employee);
        setClockHistoryData(result);
        setIsLoading(false);
        // Cast to seconds using moment and set to the punchclock-timer, using the context.
        if (result && result.length > 0) {
            const duration = intervalToDuration(result[0].workinterval);
            setTimer(duration.asSeconds());
        }
    };
    return {clockHistoryData, isLoading};
};

const performFetch = async (employee: Employee): Promise<ClockHistoryData[]> => {
    const response = await fetch('/api/getClockHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({employeeId: employee.id}),
    });
    // Expected to be an array that fits type ClockHistoryData. Empty array if HTTP response is in 200-299 range.
    return response.ok ? await response.json() : [];
};

export default useClockHistory;