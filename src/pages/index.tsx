import styles from "./home.module.scss";
import Link from "next/link";
import React from "react";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <h2>Quem é esse</h2>
      <h1>Pokémon</h1>
      <h1>?</h1>

      <Link href="/who" passHref>
        <a><Button>Começar</Button></a>
      </Link>
      <p>
        desenvolvido por{" "}
        <a target="_blank" href="https://nurielly.dev">@NuryCaroline</a>
      </p>
    </div>
  );
}
