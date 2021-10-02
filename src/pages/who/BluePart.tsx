import React from "react";

import styles from "./who.module.scss";

interface BluePartParams {
  pokemonImage: string;
}

const BluePart = ({ pokemonImage }: BluePartParams) => {
  return (
    <div className={styles.bluePart}>
      <div
        className={styles.pokemon}
        style={{ backgroundImage: `url(${pokemonImage})` }}
      />
    </div>
  );
};

export default BluePart;
