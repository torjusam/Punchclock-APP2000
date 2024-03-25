import React, { useState, useCallback, } from 'react';
import styles from './pinCodeV4.module.css';

interface KeyPadProps {
    number: string;
    onClick: () => void;
    className?: string;

}

const PinCode = ({ onSuccess }) => {
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');

    const addDigittoPin = useCallback((digit) => {
        if (pin.length < 4) {
            setPin(pin + digit);
        }
    }, [pin]);

    const removeLastDigit = useCallback(() => {
        setPin(pin.slice(0, -1));
    }, [pin]);

    const validatePin = async() => {
        // bytt med faktisk validering senere
        if (pin === '1234') {
            onSuccess();
        } else {
            setPinError('Incorrect PIN. Please try again');
            setPin('');
        }
    };

   const KeyPad: React.FC<KeyPadProps> = ({ number, onClick, className}) => {
    return (
        <button className={`${styles.keypadButton} ${className}`} onClick={onClick}>
            {number}
        </button>
        );
   };
    return (
        <div className={styles.keypad}>
            <div className={styles.pinDisplay}>{pin.replace(/./g, '•')}</div>
            <div className={styles.numberGrid}>
                {[1,2,3,4,5,6,7,8,9].map((number) => (
                    <KeyPad key={number.toString()} number={number.toString()} onClick={() => addDigittoPin(number.toString())}/>
                ))}
                <KeyPad key="cancel" number="X" onClick={removeLastDigit} className={styles.cancelButton}/>
                <KeyPad key="0" number="0" onClick={() => addDigittoPin("0")}/>
                <KeyPad key="confirm" number="✓" onClick={validatePin} className={styles.confirmButton}/>
            </div>
            {pinError && <p className={styles.errorMessage}>{pinError}</p>}
        </div>
    );

};

export default PinCode