/* 
    Author: Torjus A.M
    This hook is used to automatically go to the homepage after a certain amount of time.
    Starts a countdown of 30s, and after 20s it will display a toast warning message. If the user interacts with the page, the timers will reset.
    It is used on the employee page, so that if the user forgets to close the page, it will automatically close.
*/
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const useAutoCloseTimer = () => {
    // useRouter to navigate to a different page.
    const router = useRouter();
    // Two timers, one for the warning and one for the actual redirect.
    let closeTimer: NodeJS.Timeout | null = null;
    let toastTimer: NodeJS.Timeout | null = null;
    // 35 seconds of inactivity before redirecting.
    let timeout = 35000;

    // Clears both timers, and the toast warning if its being displayed.
    const resetTimers = () => {
        clearTimeout(closeTimer);
        clearTimeout(toastTimer);
        toast.dismiss();
        startTimers();
    };

    const startTimers = () => {
        toastTimer = setTimeout(() => {
            // Toast warning message, closes after 9s.
            toast.warning("Siden blir snart lukket automatisk...", { autoClose: 10000 });
        }, timeout - 10000);

        closeTimer = setTimeout(() => {
            // Go to url starting with "/ " (homepage).
            router.push('/');
        }, timeout);
    };

    // When component mounts (employee page), start the timers and setup eventlisteners.
    useEffect(() => {
        startTimers();

        // When a mouse or touch event is detected, reset the timers.
        window.addEventListener('mousedown', resetTimers);
        window.addEventListener('touchstart', resetTimers);

        return () => {
            window.removeEventListener('mousedown', resetTimers);
            window.removeEventListener('touchstart', resetTimers);

            if (closeTimer !== null) {
                clearTimeout(closeTimer);
            }

            if (toastTimer !== null) {
                clearTimeout(toastTimer);
            }
        };
    }, [timeout, router]);
};

export default useAutoCloseTimer;