/**
 * @file Fetches the last 7 rows of the clock history table for the given employee.
 * @module ClockHistory
 * @author Torjus A.M, Thomas H
 */
import {useState, useEffect} from 'react';
import Employee from "../../../utils/employee";
import {ClockHistoryData} from "../../../utils/types";
import {intervalToDuration} from "../../../utils/durationToPGInterval";
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";

/**
 * Custom Hook to fetch and manage the state of an employee's clock-history data.
 * @author Torjus A.M
 * @returns {Object} An object containing the fleks salary as an Interval and a loading state.
 */
const useClockHistory = () => {
    const [clockHistoryData, setClockHistoryData] = useState<ClockHistoryData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const {selectedEmployee, setTimer, setIsTimerLoading} = useSelectedEmployeeContext();

    useEffect(() => {
        if (!selectedEmployee) return;
        setIsLoading(true);
        fetchClockHistoryData(selectedEmployee);
    }, [selectedEmployee]);

    const fetchClockHistoryData = async (employee: Employee) => {
        const result = await performFetch(employee);
        setClockHistoryData(result);
        setIsLoading(false);
        // After clocking out, make the punchClockTimer display the same time as the latest workInterval fetched from the server.
        if (result.length > 0) {
            setIsTimerLoading(true);
            const duration = intervalToDuration(result[0].workinterval);
            setTimer(duration.asSeconds());
            setIsTimerLoading(false);
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

    if (!response.ok) {
        return [];
    }

    const rawData = await response.json();
    return rawData.map((item: any): ClockHistoryData => ({
        id: item.id,
        checkin: new Date(item.checkin),
        checkout: item.checkout ? new Date(item.checkout) : null,
        workinterval: item.workinterval,
        overtimeinterval: item.overtimeinterval,
    }));
};

export default useClockHistory;