import React, { useState } from 'react';

import checkedBoxIcon from '../../assets/checked_box.svg';
import checkBoxIcon from '../../assets/check_box.svg';

import styles from './index.module.css';

interface CheckBoxInterface { 
    status: boolean,
    taskId: number,
    tasksState: Array<{ name: string, status: boolean }>,
}

const CheckBox: React.FC<CheckBoxInterface> = ({status, taskId, tasksState}) => {
    const [checkBox, setCheckBox] = useState(status);

    const handleCheckBox = () => {
      setCheckBox(!checkBox);
      tasksState[taskId].status = !status;
    }

    return (
        <div>
            {status !== undefined
                ? checkBox
                    ? <img src={checkedBoxIcon} className={styles.check_box} onClick={handleCheckBox} />
                    : <img src={checkBoxIcon} className={styles.check_box} onClick={handleCheckBox} />
                : <div></div>
            }
        </div>
    );
}

export default CheckBox;