import React from 'react';
import styles from './avatar.module.css';
import displayName from '../../utils/strings';
import { intToRGB, hashCode } from './utils';

const Avatar = (props) => {
  const { contact } = props;

  return (
    <div>
      <span className={styles.img} style={{ backgroundColor: `#${intToRGB(hashCode(contact.name))}` }}>
        {displayName(contact.name)}
      </span>
    </div>
  );
};

export default Avatar;
