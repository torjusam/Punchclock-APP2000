/**
 * @file Hook for acessing and setting the balance, aswell as the loading state.
 * @Author Torjus A.M
 */
import {useState, useEffect} from 'react';
import {Employee} from "../../../lib/types/employee";
import {performFetch} from '../services/workIntervalsAPI';

export const useFetchBalance = (employee: Employee) => {
    const [balance, setBalance] = useState(null);
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            setIsBalanceLoading(true);
            const result = await performFetch(employee);
            if (!result) {
                setBalance(0);
            } else {
                setBalance(result);
            }
            setIsBalanceLoading(false);
        };
        if (employee?.lastCheckOut)
            fetchBalance();
    }, [employee?.lastCheckOut]);

    return {balance, isBalanceLoading};
};