import React, {ChangeEvent, FC, useRef, useState} from 'react';
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