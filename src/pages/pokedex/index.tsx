import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from './pokedex.module.scss'
import HeaderIcons from '../../components/Header'
import Loading from "../../components/Loading";
import PokedexTypes from "./pokedex";
import Modal from "./Modal";

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

export const POKEMONS_TYPES_COLORS = {
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
  const [pokemonsList, setPokemons] = useState<PokedexTypes.Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [pokemonSelected, setPokemonSelected] = useState<PokedexTypes.Pokemon>()

  const loadPokemons = async () => {
    const pokemonsCaptured = JSON.parse(localStorage.getItem('@pokemonsCaptured')) || []

    const getPokemonInfo = async (name) => {
      const repPokemon = await api.get(`pokemon/${name}`);
      return repPokemon.data
    }

    const getSpecies = async (id: string) => {
      const respSpecies = await api.get(`pokemon-species/${id}`);
      return respSpecies.data
    }

    const getEvolutionChain = async (urlChain: string) => {
      const respEvolution = await api.get(urlChain)
      return respEvolution.data.chain
    }

    const getEvolutions = async (pokemonData) => {
      const speciesPokeData = await getSpecies(pokemonData.id)
      const chainPokeData = await getEvolutionChain(speciesPokeData.evolution_chain?.url)
      const pokemonOrigem = await getPokemonInfo(chainPokeData.species.name)
      const species = await getSpecies(pokemonOrigem.id)
      const chain = await getEvolutionChain(species.evolution_chain?.url)

      let evolutionOne = null
      let evolutionTwo = null
      let evolutionThree = null

      evolutionOne = {
        id: pokemonOrigem.id,
        name: pokemonOrigem.name,
        image: pokemonOrigem.sprites.front_default
      }

      const respTwo = chain.evolves_to[0]?.species.name && await getPokemonInfo(chain.evolves_to[0].species.name)
      if (respTwo?.id) {
        evolutionTwo = {
          id: respTwo.id,
          name: respTwo.name,
          image: respTwo.sprites.front_default
        }
      }
      const respThree = chain.evolves_to[0]?.evolves_to[0]?.species.name && await getPokemonInfo(chain.evolves_to[0].evolves_to[0].species.name)
      if (respThree?.id) {
        evolutionThree = {
          id: respThree.id,
          name: respThree.name,
          image: respThree.sprites.front_default
        }
      }

      return [
        evolutionOne,
        evolutionTwo,
        evolutionThree,
      ].filter(x => x)
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
            pointsPower: dataMove.pp,
            type: dataMove.type.name
          }
          return move
        })
      )
    }

    const pokemonsCapturedData = await Promise.all(
      pokemonsCaptured.map(async (name) => {
        const respPokemon = await getPokemonInfo(name)
        const evolutions = await getEvolutions(respPokemon)
        const moves = await getMoves(respPokemon.moves)

        return {
          id: respPokemon.id,
          name: respPokemon.name,
          images: {
            male: {
              front: respPokemon.sprites.front_default,
              back: respPokemon.sprites.back_default,
              frontShine: respPokemon.sprites.back_shiny,
              backShine: respPokemon.sprites.front_shiny
            },
            female: {
              front: respPokemon.sprites.front_female,
              back: respPokemon.sprites.back_female,
              frontShine: respPokemon.sprites.front_shiny_female,
              backShine: respPokemon.sprites.back_shiny_female
            },
          },
          types: respPokemon.types.map(t => t.type.name),
          weight: respPokemon.weight,
          height: respPokemon.height,
          base_experience: respPokemon.base_experience,
          evolutions,
          stats: respPokemon.stats.reduce((prev, curr) => ({ ...prev, [curr.stat.name]: curr.base_stat }), {}),
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

  const handleClickPokemon = (pokemon: PokedexTypes.Pokemon) => {
    setPokemonSelected(pokemon)
    setShowModal(true)
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
            <div key={i} className={styles.pokemon} onClick={() => handleClickPokemon(pokemon)}>
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
        loading ? <Loading /> : renderContainter()
      }

      {
        showModal && <Modal
          data={pokemonSelected}
          onClose={() => setShowModal(false)}
        />
      }
    </div>
  );
}