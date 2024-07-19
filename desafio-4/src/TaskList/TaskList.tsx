import React, { useState } from 'react';

import styles from './index.module.css';
import CheckBox from '../components/CheckBox';
import TaskConfigButton from '../components/TaskConfigButton';
import Modal from '../components/Modal';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState([
        { name: 'Limpar a casa', status: false },
        { name: 'Responder e-mails', status: false },
        { name: 'Terminar o desafio 4', status: true },
    ]);
    const [newTask, setNewTask] = useState('');
    const [modalState, setModalState] = useState<{ 
        modalOpen: boolean, 
        type: 'edit' | 'delete' 
    }>({
        modalOpen: false,
        type: 'edit'
    });

    const [taskInModal, setTaskInModal] = useState(0);

    const createNewTask = (name: string) => {
        setTasks([...tasks, { name, status: false }]);
    }

    const editTask = (index: number) => {
        setModalState({ modalOpen: true, type: 'edit'});
        setTaskInModal(index);
    }

    const deleteTask = (index: number) => {
        setModalState({ modalOpen: true, type: 'delete'});
        setTaskInModal(index);
    }

    return (
        <div className={styles.container}>
            <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>

            {modalState.modalOpen
                ? <div className={styles.modal_component}>
                    <Modal 
                        type={modalState.type}
                        setModalState={setModalState}
                        taskInModal={taskInModal}
                        tasksState={{ tasks, setTasks }}
                    />
                </div>
                : <div className={styles.tasklist}>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.left}>Tarefa</th>
                                <th className={styles.center}>Status</th>
                                <th className={styles.right}>Opções</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {tasks.map((task, index) => {
                                return(
                                    <tr key={index}>
                                        <td className={styles.left}>{task.name}</td>
                                        <td className={styles.center}>
                                            <CheckBox 
                                                status={task.status} 
                                                taskId={index} 
                                                tasksState={tasks} 
                                            />
                                        </td>
                                        <td className={styles.task_config_button}>
                                            <TaskConfigButton type='edit' onClick={() => editTask(index)}/>
                                            <TaskConfigButton type='delete' onClick={() => deleteTask(index)} />
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td className={styles.new_task_text}>
                                    <input 
                                        type="text" 
                                        placeholder='Nova tarefa...' 
                                        onChange={element => setNewTask(element.target.value)} 
                                        value={newTask}
                                    />
                                </td>
                                <td className={styles.center}></td>
                                <td className={styles.right}>
                                    <button 
                                        className={styles.create_task_button} 
                                        onClick={() => newTask !== ''
                                            ? (() => {
                                                createNewTask(newTask); 
                                                setNewTask('');
                                            })()
                                            : alert('Preencha o nome da tarefa.')
                                        }
                                    >+</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default TaskList;