namespace PokedexTypes {
	export type PokemonStats = {
		name: string
		value: string
	} 
	export type PokemonMovement = {
		id: string
		name: string
		accuracy: string
		power: string
		pointsPower: string
	}
	export type PokemonEvolution = {
		id: string
		name: string
		image: string
	}
	export type Pokemon = {
		id: string
		name: string
		images: {
			male: {
				front: string
				back: string
				frontShine: string
				backShine: string
			},
			female: {
				front: string
				back: string
				frontShine: string
				backShine: string
			},
		},
		types: string[],
		weight: string
		height: string
		base_experience: string
		evolutions: {
			evolutionOne: PokemonEvolution
			evolutionTwo: PokemonEvolution
			evolutionThree: PokemonEvolution
		}
		stats: PokemonStats[]
		moves: PokemonMovement[]
	}
}

export default PokedexTypes