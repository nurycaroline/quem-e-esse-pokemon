import React, { Fragment, useState } from 'react';
import Image from 'next/image'
import PokedexTypes from "./pokedex";
import styles from './pokedex.module.scss'
import { POKEMONS_TYPES_COLORS } from '.';

type ModalPokedex = {
	data: PokedexTypes.Pokemon
	onClose(): void
}

const Modal = ({ data, onClose }: ModalPokedex) => {
	const [tabSelected, setTabSelected] = useState('about')
	const tabHeaderSelected = {
		color: 'rgba(4, 18, 88, 1)',
		borderBottom: '1px solid rgba(4, 18, 88, 1)'
	}
	const [image, setImage] = useState(data.images.male.front)
	const [shiny, setShiny] = useState(false)
	const [gender, setGender] = useState('male')
	const [position, setPosition] = useState('front')

	const handleShiny = (typeShiny) => {
		if (data.images[gender][typeShiny ? `${position}Shine`: position]) {
			setImage(data.images[gender][typeShiny ? `${position}Shine`: position])
			setShiny(typeShiny)
		}
	}

	const handleGender = (typeGender) => {
		if (data.images[typeGender][position]) {
			setImage(data.images[typeGender][position])
			setGender(typeGender)
		}
	}

	const handlePosition = (typePosition) => {
		if (data.images[gender][shiny ? `${typePosition}Shine` : typePosition]) {
			setImage(data.images[gender][shiny ? `${typePosition}Shine` : typePosition])
			setPosition(typePosition)
		}
	}

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
						src={image}
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
				<div className={styles.infos}>
					<h1>#{data.id} - {data.name}</h1>

					<div className={styles.buttons}>
						<div>
							<button onClick={() => handleGender('female')}>
								<Image
									src="/female.svg"
									alt="female"
									width={12}
									height={12}
								/>
							</button>
							<button onClick={() => handleGender('male')}>
								<Image
									src="/male.svg"
									alt="male"
									width={12}
									height={12}
								/>
							</button>
						</div>
						<button onClick={() => handleShiny(!shiny)}>SHINY</button>
						<div>
							<button onClick={() => handlePosition('back')}>
								<Image
									src="/back.svg"
									alt="back"
									width={12}
									height={12}
								/>
							</button>
							<button onClick={() => handlePosition('front')}>
								<Image
									src="/front.svg"
									alt="front"
									width={12}
									height={12}
								/>
							</button>
						</div>
					</div>

					<div className={styles.tabs}>

						<div className={styles.tabsHeader}>
							<button
								style={tabSelected === 'about' ? tabHeaderSelected : null}
								onClick={() => setTabSelected('about')}
							>
								Sobre
							</button>
							<button
								style={tabSelected === 'statistics' ? tabHeaderSelected : null}
								onClick={() => setTabSelected('statistics')}
							>
								Estatistícas
							</button>
							<button
								style={tabSelected === 'moves' ? tabHeaderSelected : null}
								onClick={() => setTabSelected('moves')}
							>
								Movimentos
							</button>
						</div>

						{tabSelected === 'about' && (
							<div className={styles.tabAbout}>
								<p>Altura: <strong>{data.height}</strong></p>
								<p>Peso: <strong>{data.weight}</strong></p>
								<p>Experiencia: <strong>{data.base_experience}</strong></p>

								<div className={styles.evolutions}>
									{
										data.evolutions.map((e, i) => (
											<Fragment key={e.name} >
												<div className={styles.evolution}>
													<Image
														src={e.image}
														alt={e.name}
														width={100}
														height={100}
													/>
													<p>{e.name}</p>
												</div>
												{
													i < (data.evolutions.length - 1) && (
														<Image
															src="/arrow.svg"
															alt="arrow"
															width={50}
															height={10}
														/>
													)
												}
											</Fragment>
										))
									}
								</div>
							</div>
						)}
						{tabSelected === 'statistics' && (
							<div className={styles.tabStatistics}>
								<p>
									<Image src="/hp.svg" alt="HP" width={25} height={25} />
									HP: <strong>{data.stats.hp}</strong>
								</p>
								<p>
									<Image src="/attack.svg" alt="Ataque" width={25} height={25} />
									Ataque: <strong>{data.stats.attack}</strong>
								</p>
								<p>
									<Image src="/defense.svg" alt="Defesa" width={25} height={25} />
									Defesa: <strong>{data.stats.defense}</strong>
								</p>
								<p>
									<Image src="/specialAttack.svg" alt="Ataque especial" width={25} height={25} />
									Ataque especial: <strong>{data.stats['special-attack']}</strong>
								</p>
								<p>
									<Image src="/specialDefense.svg" alt="Defesa especial" width={25} height={25} />
									Defesa especial: <strong>{data.stats['special-defense']}</strong>
								</p>
								<p>
									<Image src="/speed.svg" alt="Velocidade" width={25} height={25} />
									Velocidade: <strong>{data.stats.speed}</strong>
								</p>
							</div>
						)}
						{tabSelected === 'moves' && (
							<div className={styles.tabMoves}>
								{
									data.moves.map(move => (
										<div key={move.name} className={styles.move}>
											<p>
												<Image
													src={`/types-color/${move.type}.svg`}
													alt={move.type}
													width={25}
													height={25}
												/>
												<strong>{move.name}</strong>
											</p>
											<p>Precisão: {move.accuracy}</p>
											<p>Poder: {move.power}</p>
											<p>Pontos de Poder: {move.pointsPower}</p>
										</div>
									))
								}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;