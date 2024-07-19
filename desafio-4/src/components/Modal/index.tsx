import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './index.module.css';

interface ModalInterface {
    type: 'edit' | 'delete',
    setModalState: Dispatch<SetStateAction<{ 
        modalOpen: boolean,
        type: "edit" | "delete",
    }>>,
    taskInModal: number,
    tasksState: {
        tasks: Array<{ name: string, status: boolean }>,
        setTasks: Dispatch<SetStateAction<Array<{ name: string, status: boolean }>>>,
    } 
}

const Modal: React.FC<ModalInterface> = ({ type, setModalState, taskInModal, tasksState: { tasks, setTasks } }) => {
    const [ editedTask, setEditedTask ] = useState<string>('');

    const noButton = (type: 'edit' | 'delete', modalOpen: boolean) => {
        setModalState({
            modalOpen,
            type,
        });
    };

    const yesButton = (type: 'edit' | 'delete', modalOpen: boolean, newTaskName?: string) => {
        if (type === 'edit' && newTaskName !== undefined) {
            tasks[taskInModal] = {
                name: newTaskName,
                status: tasks[taskInModal].status
            };
        } else if (type === 'delete') {
            setTasks([...tasks.slice(0, taskInModal), ...tasks.slice(taskInModal + 1)]);
        }

        setModalState({
            modalOpen,
            type,
        });
    }

    return (
        <div>
            {type === 'edit'
                ? <div className={styles.modal}>
                    <h1 className={styles.modal_title}>Deseja editar este item?</h1>

                    <input 
                        type="text" 
                        placeholder='Digite as descrições da tarefa aqui.' 
                        onChange={element => setEditedTask(element.target.value)} 
                    />

                    <div className={styles.buttons}>
                        <button className={styles.cancel_button} onClick={() => noButton('edit', false)}>Não</button>
                        <button className={styles.confirm_button} onClick={() => yesButton('edit', false, editedTask)}>Sim</button>
                    </div>
                </div>
                : 
                <div className={styles.modal}>
                    <h1 className={styles.modal_title}>Deseja excluir este item?</h1>

                    <p>{tasks[taskInModal].name}</p>

                    <div className={styles.buttons}>
                        <button className={styles.cancel_button} onClick={() => noButton('delete', false)}>Não</button>
                        <button className={styles.confirm_button} onClick={() => yesButton('delete', false)}>Sim</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Modal;