import React from "react";

import styles from "./letterKeyboard.module.scss";

interface LetterKeyboardParams {
  letter: string;
  status?: "check" | "nocheck";
}

const LetterKeyboard = ({ letter, status }: LetterKeyboardParams) => {
  const renderStatus = () => {
    switch (status) {
      case "check":
        return <img className={styles.check} src="/check.svg" />;
      case "nocheck":
        return <img className={styles.nocheck} src="/no-check.svg" />;
    }
  };

  return (
    <p className={styles.letter}>
      {letter}
      {renderStatus()}
    </p>
  );
};

export default LetterKeyboard;
