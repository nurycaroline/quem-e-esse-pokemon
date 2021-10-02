import React from 'react';

import styles from "./button.module.scss";

const Button = ({ children, ...rest }): JSX.Element => {
	return <button className={styles.button} {...rest}>{children}</button>;
}

export default Button;