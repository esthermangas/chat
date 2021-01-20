import React from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

const Button = (props) => {
  const {
    size, variant, onClick, label, ...rest
  } = props;
  const buttonClass = classNames(styles.default, styles.primary, {
    [styles.big]: size === 'big',
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.secondary]: variant === 'secondary',
    [styles.tertiary]: variant === 'tertiary',
    [styles.text]: variant === 'text',
  });
  return (
    <button {...rest} className={buttonClass} onClick={onClick}>{label.toUpperCase()}</button>
  );
};

export default Button;
