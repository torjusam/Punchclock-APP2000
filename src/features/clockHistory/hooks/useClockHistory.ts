/**
 * @file Fetches the last 7 rows of the clock history table for the given employee.
 * @module ClockHistory
 * @Author Torjus A.M, Thomas H
 */
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";
import {ClockHistoryData} from "../../../lib/types/types";
import {intervalToDuration} from "../../../utils/intervalToDuration";
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";

/**
 * Custom Hook to fetch and manage the state of an employee's clock-history data.
 * @Author Torjus A.M
 * @returns {Object} An object containing the fleks salary as an Interval and a loading state.
 */
const useClockHistory = () => {
    const [clockHistoryData, setClockHistoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {selectedEmployee, setTimer} = useSelectedEmployeeContext();

    useEffect(() => {
        if (!selectedEmployee) return;
        setIsLoading(true);
        fetchClockHistoryData(selectedEmployee);
    }, [selectedEmployee]);

    const fetchClockHistoryData = async (employee: Employee) => {
        const result = await performFetch(employee);
        setClockHistoryData(result);
        setIsLoading(false);
        // Cast to seconds using moment and set to the punchclock-timer, using the context.
        if (result.length > 0) {
            const duration = intervalToDuration(result[0].workinterval);
            setTimer(duration.asSeconds());
        }
    };
    return {clockHistoryData, isLoading};
};

/**
 * Fetches the rows of clockHistory for a given employee from the server.
 * @Author Thomas H
 * @param {Employee} employee - The employee object for which the fleks salary is to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array containing the fleks salary data.
 */
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