/**
 * @file Main file for the searchbar. Contains the searchbar and the keyboardWrapper component.
 * @module Homepage
 * @description Shares state with the custom keyboardWrapper component.
 * @author Torjus A.M
 */
import React, {useState, useRef, FC, ChangeEvent} from 'react';
import SearchBarForm from './searchbar';
import KeyboardWrapper from '../../../lib/keyboard';

const SearchBar: FC = () => {
    const [searchInput, setSearchInput] = useState("");
    const [showKeyboard, setShowKeyboard] = useState(false);
    const keyboard = useRef(null);

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const input = event.target.value;
        setSearchInput(input);
        keyboard.current.setInput(input);
    };

    const handleShowKeyboard = () => {
        setShowKeyboard(true);
    };

    const handleHideKeyboard = () => {
        setShowKeyboard(false);
    };

    return (
        <>
            <SearchBarForm
                onShowKeyboard={handleShowKeyboard}
                searchInput={searchInput}
                onChangeInput={onChangeInput}
            />
            <KeyboardWrapper
                keyboardRef={keyboard}
                onChange={setSearchInput}
                showKeyboard={showKeyboard}
                handleHideKeyboard={handleHideKeyboard}
                searchInput={searchInput}
            />
        </>
    );
};

export default SearchBar;