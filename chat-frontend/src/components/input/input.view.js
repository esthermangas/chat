import React from 'react';
import classNames from 'classnames';
import styles from './input.module.css';

const Input = (props) => {
  const {
    label, size, error, ...rest
  } = props;
  const inputClass = classNames(styles.default, {
    [styles.small]: size === 'small',
    [styles.big]: size === 'big',
    [styles.error]: error,
  });
  return (
    <div className={styles.root}>
      <label className={styles.label}>
        {label}
      </label>
      <input className={inputClass} {...rest} />
      {error && (
        <span className={styles.spanError}>{error}</span>
      )}
    </div>
  );
};

export default Input;
