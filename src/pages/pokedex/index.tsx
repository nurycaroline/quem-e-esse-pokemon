import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from './pokedex.module.scss'
import HeaderIcons from '../../components/Header'

const POKEMON_TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
]

const POKEMONS_TYPES_COLORS = {
  bug: 'rgba(155, 186, 72, 1)',
  dark: 'rgba(89, 87, 97, 1)',
  dragon: 'rgba(44, 106, 193, 1)',
  electric: 'rgba(238, 217, 103, 1)',
  fairy: 'rgba(226, 150, 225, 1)',
  fighting: 'rgba(196, 77, 97, 1)',
  fire: 'rgba(239, 169, 93, 1)',
  flying: 'rgba(166, 187, 232, 1)',
  ghost: 'rgba(97, 110, 183, 1)',
  grass: 'rgba(120, 186, 100, 1)',
  ground: 'rgba(206, 128, 86, 1)',
  ice: 'rgba(139, 206, 193, 1)',
  normal: 'rgba(160, 162, 159, 1)',
  poison: 'rgba(172, 106, 202, 1)',
  psychic: 'rgba(235, 139, 133, 1)',
  rock: 'rgba(139, 206, 193, 1)',
  steel: 'rgba(101, 148, 161, 1)',
  water: 'rgba(100, 156, 218, 1)',
}

export default function Pokedex() {
  const [filtersSelected, setFiltersSelecter] = useState<string[]>([])
  const [pokemonsFiltered, setPokemonsFiltered] = useState([])
  const [pokemonsList, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPokemons = async () => {
    const pokemonsCaptured = JSON.parse(localStorage.getItem('@pokemonsCaptured')) || []

    const getPokemonInfo = async (name) => {
      return await api.get(`pokemon/${name}`);
    }

    const getEvolutionChain = async (id) => {
      const respEvolution = await api.get(`evolution-chain/${id}`)
      if (respEvolution.data?.chain.evolves_to[0]) {
        const specieName = respEvolution.data?.chain.evolves_to[0]?.species.name
        const respPokemonInfo = await getPokemonInfo(specieName)
        return respPokemonInfo?.data
      }
      return null
    }

    const getEvolutions = async (pokemonData) => {
      let evolutionOne = null
      let evolutionTwo = null
      let evolutionThree = null

      try {
        if (pokemonData?.is_default) {
          evolutionOne = await getEvolutionChain(pokemonData.id)

          if (evolutionOne) {
            evolutionOne = {
              id: evolutionOne.id,
              nome: evolutionOne.name,
              image: evolutionOne.sprites.front_default
            }

            evolutionTwo = await getEvolutionChain(evolutionOne.id)

            if (evolutionTwo) {
              evolutionTwo = {
                id: evolutionTwo.id,
                nome: evolutionTwo.name,
                image: evolutionTwo.sprites.front_default
              }

              evolutionThree = await getEvolutionChain(evolutionTwo.id)

              if (evolutionThree) {
                evolutionThree = {
                  id: evolutionThree.id,
                  nome: evolutionThree.name,
                  image: evolutionThree.sprites.front_default
                }
              }
            }
          }
        }
      } catch (error) {

      }

      return {
        evolutionOne,
        evolutionTwo,
        evolutionThree,
      }
    }

    const getMoves = async (moves) => {
      return Promise.all(
        moves.map(async ({ move }) => {
          const urlMove = move.url.replace('https://pokeapi.co/api/v2/', '')
          const respMove = await api.get(urlMove)
          const dataMove = respMove.data || {}

          return {
            id: dataMove.id,
            name: dataMove.name,
            accuracy: dataMove.accuracy,
            power: dataMove.power,
            pointsPower: dataMove.pp
          }
          return move
        })
      )
    }

    const pokemonsCapturedData = await Promise.all(pokemonsCaptured.map(async (name) => {
      const respPokemon = await getPokemonInfo(name)
      const pokemonData = respPokemon.data || {}
      const evolutions = []//await getEvolutions(pokemonData)
      const moves = await getMoves(pokemonData.moves)

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        images: {
          male: {
            front: pokemonData.sprites.front_default,
            back: pokemonData.sprites.back_default,
            frontShine: pokemonData.sprites.back_shiny,
            backShine: pokemonData.sprites.front_shiny
          },
          female: {
            front: pokemonData.sprites.front_female,
            back: pokemonData.sprites.back_female,
            frontShine: pokemonData.sprites.front_shiny_female,
            backShine: pokemonData.sprites.back_shiny_female
          },
        },
        types: pokemonData.types.map(t => t.type.name),
        weight: pokemonData.weight,
        height: pokemonData.height,
        base_experience: pokemonData.base_experience,
        evolutions,
        stats: pokemonData.stats.map(s => ({ value: s.base_stat, name: s.stat.name })),
        moves
      };
    }))

    console.log(pokemonsCapturedData)
    setPokemons(pokemonsCapturedData)
    setPokemonsFiltered(pokemonsCapturedData)
    setLoading(false)
  }

  const handleUpdateFiltersSelected = (type: string) => {
    if (filtersSelected.includes(type)) {
      return setFiltersSelecter(filtersSelected.filter(t => t !== type))
    }
    return setFiltersSelecter([...filtersSelected, type])
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  useEffect(() => {
    if (filtersSelected.length) {
      setPokemonsFiltered(pokemonsList
        .filter(p => p.types
          .some(t => filtersSelected.includes(t))
        )
      )
    } else {
      setPokemonsFiltered(pokemonsList)
    }
  }, [filtersSelected])

  const renderContainter = () => (
    <div className={styles.container}>
      <HeaderIcons />
      <section className={styles.section}>
        <h1>Pokémons encontrados ({pokemonsList.length})</h1>

        <div className={styles.filter}>
          {POKEMON_TYPES.map(type => (
            <button
              key={type}
              className={filtersSelected.includes(type) ? styles[type] : ''}
              onClick={() => handleUpdateFiltersSelected(type)}
            >
              <Image
                src={`/types/${type}.svg`}
                alt={type}
                width={25}
                height={25}
              />
            </button>
          ))}
        </div>

        <div className={styles.pokemons}>
          {pokemonsFiltered.map((pokemon, i) => (
            <div key={i} className={styles.pokemon}>
              <div className={`${styles[pokemon.types[0]]} ${styles.pokemonId}`}>#{pokemon.id}</div>
              <div className={`${styles.pokemonInfo}`}
                style={{
                  background: pokemon.types.length > 1 ?
                    `linear-gradient(135deg, ${POKEMONS_TYPES_COLORS[pokemon.types[0]]} 10%, ${POKEMONS_TYPES_COLORS[pokemon.types[1]]} 100%)`
                    : POKEMONS_TYPES_COLORS[pokemon.types[0]]
                }}
              >
                <Image
                  src={pokemon.images.male.front}
                  alt={pokemon.name}
                  width={170}
                  height={170}
                />
                <p>{pokemon.name}</p>

                <div className={styles.pokemonInfoTypes}>
                  {
                    pokemon.types.map((t) => (
                      <div key={t}>
                        <Image
                          src={`/types/${t}.svg`}
                          alt={t}
                          width={15}
                          height={15}
                        />
                        {t}
                      </div>
                    ))
                  }
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <div className={styles.page}>
      <Head>
        <title>Pokédex</title>
      </Head>

      {
        loading ? <h1>Carregando...</h1> : renderContainter()
      }
    </div>
  );
}