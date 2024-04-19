/**
 * @file Used to display the keyboard on the frontpage when the searchbar is highlighted.'
 * @description Uses library: react-simple-keyboard.
 * @author Torjus A.M
 */
import React, {FC, MutableRefObject, useEffect, useState} from "react";
import Keyboard, {KeyboardLayoutObject} from "react-simple-keyboard";
import {useOutsideClick} from "../../hooks/clickOutside";
import "react-simple-keyboard/build/css/index.css";
import styles from "./keyboardWrapper.module.css";

interface KeyboardProps {
    onChange: (input: string) => void;
    keyboardRef: MutableRefObject<any>;
    showKeyboard: boolean;
    handleHideKeyboard: () => void;
    searchInput: string;
}

const KeyboardWrapper: FC<KeyboardProps> = ({
                                                onChange,
                                                keyboardRef,
                                                showKeyboard,
                                                handleHideKeyboard,
                                                searchInput,
                                            }) => {

    // Keyboard-layout defined with key default/shift for upper/lowercase.
    const keyboardLayout: KeyboardLayoutObject = {
        default: [
            "q w e r t y u i o p å {bksp}",
            "a s d f g h j k l ø æ {enter}",
            "{empty} z x c v b n m {empty}",
            "{space}",
            "{close} {empty} {empty} {empty}",
        ],
        shift: [
            "Q W E R T Y U I O P Å {bksp}",
            "A S D F G H J K L Ø Æ {enter}",
            "{empty} Z X C V B N M {empty}",
            "{space}",
            "{close} {empty} {empty} {empty}",
        ],
    };

    const [layoutName, setLayoutName] = useState("shift")

    // Hook to change between uppercase and lowercase layoutName.
    useEffect(() => {
        // If input is empty or ends with a space, set layout to shift (Uppercase).
        if (searchInput.length === 0 || searchInput.endsWith(" ")) {
            setLayoutName("shift");
            // If last letter is capitalized, set layout to default.
        } else if (searchInput.slice(-1) && searchInput.slice(-1) === searchInput.slice(-1).toUpperCase()) {
            setLayoutName("default");
        }
    }, [searchInput]);

    // Click outside of keyboard hides it
    const ref = useOutsideClick(() => {
        handleHideKeyboard();
    });

    return (
        <div className={`${styles.keyboardContainer} ${showKeyboard ? '' : styles.hidden}`}
             ref={ref}>
            {/* Instantiate keyboard object */}
            <Keyboard
                keyboardRef={r => (keyboardRef.current = r)}
                onChange={onChange}
                layout={keyboardLayout}
                layoutName={layoutName}
                /* Change label for special keys */
                display={{
                    '{bksp}': '⌫',
                    '{space}': ' ',
                    '{enter}': '⏎',
                    '{close}': '&darr;'
                }}
                buttonTheme={[
                    /* Defines styles for specific buttons */
                    {
                        class: "hg-space",
                        buttons: "{space}"
                    },
                    {
                        class: "hg-empty",
                        buttons: "{empty}"
                    },
                    {
                        class: "hg-enter",
                        buttons: "{enter}"
                    },
                    {
                        class: "hg-close",
                        buttons: "{close}"
                    }
                ]}
                /* Set custom button to close the keyboard */
                onKeyPress={(button) => {
                    if (button === "{close}") {
                        handleHideKeyboard();
                    }
                }}
            />
        </div>
    );
};

export default KeyboardWrapper;
