import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import BluePart from "./BluePart";
import { api } from "../../services/api";

import styles from "./who.module.scss";
import Header from "../../components/Header";
import pokeIds from "../../helpers/pokeIds";
import YellowPart from "./YellowPart";
import React, { useState } from "react";
import Modal, { BODY_ALERTS } from "../../components/Modal";


export default function Who({ pokemon }) {
  const router = useRouter();
  const [points, setPoints] = useState(10)

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

        <BluePart id={pokemon.id} pokemonImage={pokemon.image} />
        <YellowPart
          pokemonName={pokemon.name}
          points={points}
          setPoints={setPoints}
        />
      </div>

      {!points && <Modal>{BODY_ALERTS.gameOver}</Modal>}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = pokeIds.map(article => ({ params: { articleId: article } }))

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async () => {
  const pokemonIdRandom = Math.floor(Math.random() * pokeIds.length);
  const pokemonId = pokeIds[pokemonIdRandom]
  const { data } = await api.get(`pokemon/${pokemonId}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
  };

  return {
    props: {
      pokemon,
    },
    revalidate: true, //60 * 60 * 24, //24 hours
  };
};
