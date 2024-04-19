/**
 * @file Custom hook for handling clicks outside of a component. Registers click outside of a component using useRef and useEffect hook.
 * @description Taken from: https://dev.to/rashed_iqbal/how-to-handle-outside-clicks-in-react-with-typescript-4lmc
 * Modified to use touchstart aswell as mouseevents, to make it work on touchscreens.
 */
import {useEffect, useRef} from 'react';

export const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideEvent = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleOutsideEvent);
        document.addEventListener('touchstart', handleOutsideEvent);

        return () => {
            document.removeEventListener('mousedown', handleOutsideEvent);
            document.removeEventListener('touchstart', handleOutsideEvent);
        };
    }, [callback]);

    return ref;
};