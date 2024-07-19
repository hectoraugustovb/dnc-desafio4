import React, { MouseEventHandler } from 'react';

import editIcon from '../../assets/edit_icon.svg';
import deleteIcon from '../../assets/delete_icon.svg';

import styles from './index.module.css';

interface TaskConfigButtonInterface { 
  type: 'edit' | 'delete', 
  onClick: MouseEventHandler<HTMLButtonElement> 
}

const TaskConfigButton: React.FC<TaskConfigButtonInterface> = ({ type, onClick }) => {
  return (
    <div className={styles.config_task}>
      {
        type === 'edit'
          ? <button onClick={onClick}><img src={editIcon} /></button>
          : <button onClick={onClick} ><img src={deleteIcon} /></button>
      }
    </div>
  );
}

export default TaskConfigButton;