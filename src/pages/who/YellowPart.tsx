import React from "react";
import LetterKeyboard from "../../components/LetterKeyboard";

import styles from "./who.module.scss";

interface YellowPartParams {
  errors: number;
  pokemonName: string;
}

const YellowPart = ({ errors, pokemonName }: YellowPartParams) => {
  return (
    <div className={styles.yellowPart}>
      <div className={styles.blocksName}>
        {[...pokemonName].map((letter, idx) => (
          <p key={idx}>{letter}</p>
        ))}
      </div>
      <div className={styles.heart}>
        <img src="/heart.svg" />
        <span>{errors}</span>
      </div>
      <div className={styles.keyboard}>
        <div className={styles.lines}>
          <LetterKeyboard letter="q" />
          <LetterKeyboard letter="w" />
          <LetterKeyboard letter="e" />
          <LetterKeyboard letter="r" />
          <LetterKeyboard letter="t" />
          <LetterKeyboard letter="y" />
          <LetterKeyboard letter="u" status="check" />
          <LetterKeyboard letter="i" status="nocheck" />
          <LetterKeyboard letter="o" />
          <LetterKeyboard letter="p" />
        </div>
        <div className={styles.lines}>
          <LetterKeyboard letter="a" />
          <LetterKeyboard letter="s" />
          <LetterKeyboard letter="d" />
          <LetterKeyboard letter="f" />
          <LetterKeyboard letter="g" />
          <LetterKeyboard letter="h" />
          <LetterKeyboard letter="j" />
          <LetterKeyboard letter="k" />
          <LetterKeyboard letter="l" />
        </div>
        <div className={styles.lines}>
          <LetterKeyboard letter="z" />
          <LetterKeyboard letter="x" />
          <LetterKeyboard letter="c" />
          <LetterKeyboard letter="v" />
          <LetterKeyboard letter="b" />
          <LetterKeyboard letter="n" />
          <LetterKeyboard letter="m" />
        </div>
      </div>
    </div>
  );
};

YellowPart.defaultProps = {
  errors: 10,
};

export default YellowPart;
