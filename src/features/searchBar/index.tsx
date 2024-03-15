/* 
  Author: Torjus A.M
  Used to share state between the keyboard and the searchbar. Searchbar should tell
  keyboard when to appear, and keyboard should tell searchbar when to update its input.
*/
import React, { useState, useRef, FC, ChangeEvent } from 'react';
import SearchBarForm from './components/searchbar';
import KeyboardWrapper from '../keyboard/components/keyboardWrapper';

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