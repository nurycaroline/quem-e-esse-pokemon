import React from "react";
import Link from "next/link";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link href="/" passHref>
        <a className={styles.btLogo}>
          <img src="/logo.svg" alt="Logo" />
        </a>
      </Link>
      <Link href="/pokedex">
        <a className={styles.btPokedex}>
          <img src="/pokedex.svg" alt="Pokedex" />
        </a>
      </Link>
    </div>
  );
};

export default Header;
