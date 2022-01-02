import React from 'react';
import Image from 'next/image'
import PokedexTypes from "./pokedex";
import styles from './pokedex.module.scss'
import { POKEMONS_TYPES_COLORS } from '.';

type ModalPokedex = {
	data: PokedexTypes.Pokemon
	onClose(): void
}

const Modal = ({ data, onClose }: ModalPokedex) => {
	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalBody}>
				<button
					className={styles.button}
					onClick={onClose}
				>
					<div>X</div>
				</button>
				<div className={styles.image}>
					<Image
						src={data?.images.male.front}
						alt={data?.name}
						width={200}
						height={200}
						quality={100}
					/>
				</div>
				<div className={styles.types}>
					{
						data.types.map(type => (
							<div key={type} className={`${styles[type]} ${styles.type}`}>
								<Image
									src={`/types-color/${type}.svg`}
									alt={type}
									width={25}
									height={25}
								/>
								<p style={{ color: POKEMONS_TYPES_COLORS[type] }}>{type}</p>
							</div>
						))
					}
				</div>
				<h1>#{data.id} - {data.name}</h1>

				<div className={styles.buttons}>
					<div>
						<button> + </button>
						<button> -> </button>
					</div>
					<button>SHINY</button>
					<div>
						<button> back</button>
						<button> front </button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;