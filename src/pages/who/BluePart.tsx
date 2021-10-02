import React from "react";

import styles from "./who.module.scss";

interface BluePartParams {
  id: string;
  pokemonImage: string;
}

const BluePart = ({ pokemonImage, id }: BluePartParams) => {
  return (
    <div className={styles.bluePart}>
      {/* <h1>#{id}</h1> */}
      <div
        className={styles.pokemon}
        style={{ backgroundImage: `url(${pokemonImage})` }}
      />
    </div>
  );
};

export default BluePart;
