/**
 * @file Pin-code to be used to authenticate before redirect to employees personal page.
 * This functionality was not implemented with proper authentication because of a lack of time.
 * @module Authentication
 * @Author Thomas H
 */
import React, {useCallback, useState,} from 'react';
import styles from './pinCodeV4.module.css'

interface KeyPadProps {
    number: string;
    onClick: () => void;
    className?: string;

}

/**
 * The PinCode component is used to authenticate a user by entering a pin code.
 * @param {Object} props - The properties passed to the component.
 * @param {() => void} props.onSuccess - The function to be executed when the pin code is successfully validated.
 * @returns {JSX.Element} The rendered PinCode component.
 */
const PinCode = ({onSuccess}) => {
    // The entered pin code and any error message are stored in state.
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');

    /**
     * Adds a digit to the pin code if it is less than 4 digits long.
     * @param {string} digit - The digit to be added to the pin code.
     */
    const addDigittoPin = useCallback((digit) => {
        if (pin.length < 4) {
            setPin(pin + digit);
        }
    }, [pin]);

    // Remove last digit from pin code
    const removeLastDigit = useCallback(() => {
        setPin(pin.slice(0, -1));
    }, [pin]);

    /**
     * Validates the pin code.
     * If the pin code is '1234', the onSuccess function is called.
     * Otherwise, an error message is displayed and the pin code is reset.
     */
    const validatePin = async () => {
        // bytt med faktisk validering senere
        if (pin === '1234') {
            onSuccess();
        } else {
            setPinError('Incorrect PIN. Please try again');
            setPin('');
        }
    };

    /**
     * The KeyPad component represents a button on the pin code keypad.
     * @param {KeyPadProps} props - The properties passed to the component.
     * @returns {JSX.Element} The rendered KeyPad component.
     */
    const KeyPad: React.FC<KeyPadProps> = ({number, onClick, className}) => {
        return (
            <button className={`${styles.keypadButton} ${className}`} onClick={onClick}>
                {number}
            </button>
        );
    };

    return (
        <div className={styles.keypad}>
            <div className={styles.errorMessageContainer}>
                {pinError && <p className={styles.errorMessage}>{pinError}</p>}
            </div>
            <div className={styles.pinDisplay}>{pin.replace(/./g, '•')}</div>
            <div className={styles.numberGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <KeyPad key={number.toString()} number={number.toString()}
                            onClick={() => addDigittoPin(number.toString())}/>
                ))}
                <KeyPad key="cancel" number="X" onClick={removeLastDigit} className={styles.cancelButton}/>
                <KeyPad key="0" number="0" onClick={() => addDigittoPin("0")}/>
                <KeyPad key="confirm" number="✓" onClick={validatePin} className={styles.confirmButton}/>
            </div>
        </div>
    );

};

export default PinCode