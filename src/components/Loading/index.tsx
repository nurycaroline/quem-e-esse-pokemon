import React from 'react';

import styles from './loading.module.scss'

const Loading: React.FC = () => {
	return (
		<div className={styles.container}>
			<h2>Carregando...</h2>
		</div>
	);
}

export default Loading;