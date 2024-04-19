/**
 * @file Hook for automatically redirecting to the homepage after a certain amount of time, and warning the user before closing.
 * @author Torjus A.M, Thomas H
 */
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const useAutoCloseTimer = (secondsToClose: number) => {
    const router = useRouter();
    // Two timers, one for the warning and one for the actual redirect.
    let closeTimer: NodeJS.Timeout | null = null;
    let warningTimer: NodeJS.Timeout | null = null;
    // Timeout in milliseconds
    let timeout = secondsToClose * 1000;

    /**
     * @function resetTimers
     * @description Clears both timers, dismisses any notifications, and restarts the timers.
     * @author Torjus A.M
     */
    const resetTimers = () => {
        clearTimeout(closeTimer);
        clearTimeout(warningTimer);
        toast.dismiss();
        startTimers();
    };

    /**
     * @function startTimers
     * @description Sets up two timers: warningTimer that triggers a warning 10s before redirecting,
     * and a closeTimer that redirects the user to the homepage when it expires.
     * @author Thomas H
     */
    const startTimers = () => {
        // warningTimer 10 seconds before close
        warningTimer = setTimeout(() => {
            toast.warning("Siden blir snart lukket automatisk...", {autoClose: 10000});
        }, timeout - 10000);

        closeTimer = setTimeout(() => {
            // Go to url starting with "/ " (homepage).
            router.push('/');
        }, timeout);
    };

    /**
     * @function useEffect
     * @description Hook starts the timers and sets up event listeners when component mounts.
     * These events reset the timers when triggered.
     * @author Torjus A.M
     */
    useEffect(() => {
        startTimers();

        // When a mouse or touch event is detected, reset the timers.
        window.addEventListener('mousedown', resetTimers);
        window.addEventListener('touchstart', resetTimers);

        return () => {
            window.removeEventListener('mousedown', resetTimers);
            window.removeEventListener('touchstart', resetTimers);

            if (closeTimer !== null)
                clearTimeout(closeTimer);

            if (warningTimer !== null)
                clearTimeout(warningTimer);
        };
    }, [timeout, router]);
};

export default useAutoCloseTimer;