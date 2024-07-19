import React from 'react';

import styles from './index.module.css';

const NavBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
        <p>Organização</p>
        <p>Tarefas</p>
    </div>
  );
}

export default NavBar;