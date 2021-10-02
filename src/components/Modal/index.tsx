import Link from 'next/link';
import React from 'react';
import Button from '../Button';

import styles from "./modal.module.scss";

export const BODY_ALERTS = {
	gameOver: (
		<div className={styles.gameOver}>
			<img src="/logo.svg" alt="Logo" />
			<h2>O jogo acabou!</h2>
			<Link href="/" passHref>
				<Button>Tentar novamente</Button>
			</Link>
		</div>
	),
	winPokeball: (
		<div className={styles.winPokeball}>
			<img src="/pokeball.svg" alt="Logo" />
			<h2>Parabéns voce ganhou uma <strong>Pokébola</strong>!</h2>
			<p>Pokébolas desbloqueiam uma letra correta.</p>
			<Link href="/who" passHref>
				<Button>Continuar</Button>
			</Link>
		</div>
	)
}

const Modal: React.FC = ({ children }) => {
	return (
		<>
			<div className={styles.background} />
			<div className={styles.modal}>
				{children}
			</div>
		</>
	);
}

export default Modal;