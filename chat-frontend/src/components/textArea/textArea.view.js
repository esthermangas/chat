import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './textArea.module.css';

const AutoTextArea = (props) => (
  <TextareaAutosize
    {...props}
    className={styles.textarea}
  />
);

export default AutoTextArea;
