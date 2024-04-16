/**
 * @file Clocks employee out automatically after a set timerLimit has been passed. In this case 15 hours.
 * @module ClockOperation
 * @Author: Torjus A.M, Thomas H
 */
import {useEffect} from 'react';
import {clockOut} from "../services";
import {logUserActivity} from "../../../pages/api/serverUtilts/logUserActivity";
import {useSession} from "next-auth/react";
import {Employee} from "../../../lib/types/employee";

/**
 * Hook to check if the timer limit has been reached, and clock out the employee if it has.
 * @param employee - The employee who is being clocked out.
 * @param currentTime - Used in the clockOut function.
 * @param timerLimit - Boolean indicating if the timer limit has been reached.
 */
export const useTimerLimit = (employee: Employee, currentTime: Date, timerLimit: boolean) => {
    // Gets the currently logged-in user id for logging.
    const {data: session} = useSession();

    useEffect(() => {
        if (timerLimit && employee) {
            const logActivity = (eventType: string, error?) => logUserActivity(
                eventType,
                session.user.id,
                `employeeId: ${employee.id}${error ? ` error: ${error.message}` : ''}`
            );

            // Return promise of clockOut with either error or success log.
            clockOut(employee, currentTime)
                .then(() => {
                    logActivity("auto_clockOut");
                })
                .catch((error) => {
                    logActivity("auto_clockOut_error", error);
                });
        }
        // Re-run everytime timerLimit changes
    }, [timerLimit]);
};