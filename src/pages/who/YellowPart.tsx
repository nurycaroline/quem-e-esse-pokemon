import React, { useState } from "react";
import LetterKeyboard from "../../components/LetterKeyboard";

import styles from "./who.module.scss";

interface YellowPartParams {
  pokemonName: string;
}

const lettersFirstLine = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
const lettersSecondLine = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
const lettersThirdLine = ["z", "x", "c", "v", "b", "n", "m"]
const lines = [lettersFirstLine, lettersSecondLine, lettersThirdLine]

const YellowPart = ({ pokemonName }: YellowPartParams) => {
  const [rightLetters, setRightLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [points, setPoints] = useState(10)

  function nameHasLetter(letter) {
    if (pokemonName.includes(letter)) {
      setRightLetters([...rightLetters, letter])
    } else {
      setPoints(points-1)
      setWrongLetters([...wrongLetters, letter])
    }
  }

  function setLetterStatus(letter) {
    if (rightLetters.includes(letter)) {
      return "check"
    } if (wrongLetters.includes(letter)) {
      return "nocheck"
    }
    return null
  }

  return (
    <div className={styles.yellowPart}>
      <div className={styles.blocksName}>
        {[...pokemonName].map((letter, idx) => (
          <p key={idx}>{(rightLetters.includes(letter) || letter == "-") && letter}</p>
        ))}
      </div>
      <div className={styles.heart}>
        <img src="/heart.svg" />
        <span>{points}</span>
      </div>
      <div className={styles.keyboard}>
        {
          lines.map((line, i) => (
            <div className={styles.lines} key={i}>
              {
                line.map(letter => (
                  <LetterKeyboard
                    key={letter}
                    letter={letter}
                    onClick={() => nameHasLetter(letter)}
                    status={setLetterStatus(letter)}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

YellowPart.defaultProps = {
  errors: 10,
};

export default YellowPart;
