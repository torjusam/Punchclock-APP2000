/**
 * @file Hook for acessing and setting the balance, aswell as the loading state. The balance is stored in the context, as its used
 * in multiple components for caluclations and display.
 * @Author Torjus A.M
 */
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";
import {fetchBalance} from '../services/workIntervalsAPI';
import {Interval, defaultInterval} from "../../../lib/types/types";

export const useFetchBalance = (employee: Employee) => {
    const [balance, setBalance] = useState<Interval>(defaultInterval());
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);

    useEffect(() => {
        if (!employee?.lastCheckOut) return;

        setIsBalanceLoading(true);
        fetchBalance(employee)
            .then(result => {
                if (result && result[0].sum) {
                    // Cast the result (first row, sum object) to the Interval type
                    const sum = result[0].sum;
                    const interval = {
                        years: sum.years,
                        months: sum.months,
                        days: sum.days,
                        hours: sum.hours,
                        minutes: sum.minutes,
                        seconds: sum.seconds,
                        milliseconds: sum.milliseconds
                    } as Interval;
                    setBalance(interval);
                } else {
                    setBalance(defaultInterval());
                }
            })
            .finally(() => setIsBalanceLoading(false));
    }, [employee?.lastCheckOut]);

    return {balance, isBalanceLoading};
};