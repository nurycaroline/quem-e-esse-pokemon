import React from "react";

import styles from "./letterKeyboard.module.scss";

interface LetterKeyboardParams {
  letter: string;
  status: "check" | "nocheck" | null;
  onClick(): void
  disabled: boolean
}

const LetterKeyboard = ({ letter, status, onClick, disabled }: LetterKeyboardParams) => {
  const renderStatus = () => {
    switch (status) {
      case "check":
        return <img className={styles.check} src="/check.svg" />;
      case "nocheck":
        return <img className={styles.nocheck} src="/no-check.svg" />;
    }
  };

  return (
    <button className={styles.letter} onClick={onClick} disabled={disabled}>
      {letter}
      {renderStatus()}
    </button>
  );
};

export default LetterKeyboard;
