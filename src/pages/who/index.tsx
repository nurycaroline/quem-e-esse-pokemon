import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { api } from "../../services/api";

import styles from "./who.module.scss";
import Header from "../../components/Header";
import pokeIds from "../../helpers/pokeIds";

export default function Who({ pokemon }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Head>
        <title>Quem é esse Pokemon?</title>
      </Head>

      <div className={styles.who}>
        <Header />

        <div className={styles.partOne}>
          <div
            className={styles.pokemon}
            style={{ backgroundImage: `url(${pokemon.image})` }}
          />
        </div>
        <div className={styles.partTwo}></div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pokemonIdRandom = Math.floor(Math.random() * pokeIds.length);
  const { data } = await api.get(`pokemon/${pokemonIdRandom}`);
  
  const pokemon = {
    name: data.name,
    image: data.sprites.front_default,
  };

  return {
    props: {
      pokemon,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
