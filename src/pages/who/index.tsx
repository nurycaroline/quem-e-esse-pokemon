import { useRouter } from "next/router";
import Head from "next/head";
import BluePart from "./BluePart";
import { api } from "../../services/api";

import styles from "./who.module.scss";
import Header from "../../components/Header";
import pokeIds from "../../helpers/pokeIds";
import YellowPart from "./YellowPart";
import React, { useEffect, useState } from "react";
import Modal, { BODY_ALERTS } from "../../components/Modal";

type Pokemon = {
  id: string
  name: string
  image: string
}

export default function Who() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [points, setPoints] = useState(10)

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  async function loadPokemon() {
    const pokemonIdRandom = Math.floor(Math.random() * pokeIds.length);
    const pokemonId = pokeIds[pokemonIdRandom]
    const { data } = await api.get(`pokemon/${pokemonId}`);

    setPokemon({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    })
  }

  useEffect(() => {
    loadPokemon()
  }, [])

  return (
    <div>
      <Head>
        <title>Quem é esse Pokemon?</title>
      </Head>

      {
        pokemon && pokemon.id && (<div className={styles.who}>
        <Header />

        <BluePart id={pokemon.id} pokemonImage={pokemon.image} />
        <YellowPart
          pokemonName={pokemon.name}
          points={points}
          setPoints={setPoints}
          loadPokemon={loadPokemon}
        />
      </div>)
      }

      {!points && <Modal>{BODY_ALERTS.gameOver}</Modal>}
    </div>
  );
}


// export const getStaticProps: GetStaticProps = async () => {
//   const pokemonIdRandom = Math.floor(Math.random() * pokeIds.length);
//   const pokemonId = pokeIds[pokemonIdRandom]
//   const { data } = await api.get(`pokemon/${pokemonId}`);
//   const pokemon = {
//     id: data.id,
//     name: data.name,
//     image: data.sprites.front_default,
//   };
//   return {
//     props: {
//       pokemon,
//     },
//     revalidate: true, //60 * 60 * 24, //24 hours
//   };
// };
