import React from 'react';

import styles from "./button.module.scss";

const Button: React.FC = ({ children, ...rest }) => {
	return <button className={styles.button} {...rest}>{children}</button>;
}

export default Button;