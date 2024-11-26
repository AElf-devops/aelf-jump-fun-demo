import styles from './styles.module.css';
import React from 'react';

export function DotTyping({ loading = true }: { loading?: boolean }) {
  return (
    <div className={`${styles.dotTypingStage} ${loading ? 'flex' : 'hidden'}`}>
      <div className={styles.dotTyping}></div>
    </div>
  );
}
