import styles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <h2>Quem é esse</h2>
      <h1>Pokémon</h1>
      <h1>?</h1>

      <Link href="/who" passHref>
        <button>Começar</button>
      </Link>
      <p>
        desenvolvido por{" "}
        <a target="_blank" href="https://nurielly.dev">@NuryCaroline</a>
      </p>
    </div>
  );
}
