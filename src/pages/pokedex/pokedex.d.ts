namespace PokedexTypes {
	export type PokemonStats = {
		attack: number
		defense: number
		hp: number
		'special-attack': number
		'special-defense': number
		speed: number
	} 
	export type PokemonMovement = {
		id: string
		name: string
		accuracy: string
		power: string
		pointsPower: string
		type: string
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
		evolutions: PokemonEvolution[]
		stats: PokemonStats
		moves: PokemonMovement[]
	}
}

export default PokedexTypes