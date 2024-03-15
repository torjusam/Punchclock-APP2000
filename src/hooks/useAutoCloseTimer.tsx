/* 
    Author: Torjus A.M
    This hook is used to automatically go to the homepage after a certain amount of time.
    Takes in a timeout and warning time in ms, and returns a boolean that is true when the warning time is reached.
*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAutoCloseTimer = (timeout: number, warningTime: number) => {
    const [showWarning, setShowWarning] = useState(false);
    const router = useRouter();

    // Hook uses JS setTimeout() method to set states and go to index page after a certain amount of time.
    useEffect(() => {
        const warningTimer = setTimeout(() => {
            setShowWarning(true);
        }, timeout - warningTime);

        const closeTimer = setTimeout(() => {
            router.push('/');
        }, timeout);

        return () => {
            // After the page is closed, the timers are cleared.
            clearTimeout(warningTimer);
            clearTimeout(closeTimer);
        };
    }, [timeout, warningTime, router]);

    return showWarning;
};

export default useAutoCloseTimer;