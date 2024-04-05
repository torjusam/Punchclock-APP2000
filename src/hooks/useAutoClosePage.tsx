/* 
    Author: Torjus A.M, Thomas H
    This hook is used to automatically go to the homepage after a certain amount of time.
    Starts a countdown to close, and 10s before it display a warning toast.
    If the user interacts with the page, the timers will reset.
*/
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

// Author: Torjus A.M
const useAutoCloseTimer = (secondsToClose: number) => {
    // useRouter to navigate to a different page.
    const router = useRouter();
    // Two timers, one for the warning and one for the actual redirect.
    let closeTimer: NodeJS.Timeout | null = null;
    let warningTimer: NodeJS.Timeout | null = null;
    // 35 seconds of inactivity before redirecting.
    let timeout = secondsToClose * 1000;

    // Clears both timers, and the toast warning if its being displayed.
    const resetTimers = () => {
        clearTimeout(closeTimer);
        clearTimeout(warningTimer);
        toast.dismiss();
        startTimers();
    };

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

    // Thomas H: When component mounts (employee page), start the timers and setup eventlisteners.
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