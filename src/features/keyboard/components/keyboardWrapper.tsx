/* 
  Author: Torjus A.M
  Used to display the keyboard on the frontpage when the searchbar is highlighted.
  Uses library: react-simple-keyboard.
  The keyboard is only displayed when the showKeyboard prop from searchbar is true.  
  To-Do: 
    - Fix the search funtion using the keyboard. Choosing one element endlessly types the same letter.
    - Ease in transition. Atm very abrupt and not very smooth.
*/
import React, { FunctionComponent, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import styles from "./keyboardWrapper.module.css";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<any>;
  showKeyboard: boolean;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({ onChange, keyboardRef, showKeyboard }) => {

  const onKeyPress = (button: string) => {

  };

  return (
    <>
      {/* If input is selected: */}
      {showKeyboard && (
        <div className={`${styles.keyboardContainer} ${showKeyboard ? '' : styles.hidden}`}>
          <Keyboard
            keyboardRef={r => (keyboardRef.current = r)}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onRender={() => console.log("Rendered")}
            /* Layout of keyboard */
            layout={{
              default: [
                "Q W E R T Y U I O P Å {bksp}",
                "A S D F G H J K L Ø Æ {enter}",
                "{empty} Z X C V B N M {empty}",
                "{space}"
              ],
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
              }
            ]}
          />
        </div>
      )}
    </>
  );
};

export default KeyboardWrapper;
