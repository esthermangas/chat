import React from 'react';
import classNames from 'classnames';
import styles from './selected.module.css';

const Selected = (props) => {
  const { select, label, onClick } = props;
  const selectedClass = classNames(styles.noSelected, {
    [styles.selected]: select,
  });
  return (
    <div className={selectedClass} onClick={onClick}>
      {label}
    </div>
  );
};

export default Selected;
