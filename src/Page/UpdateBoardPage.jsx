import React from 'react';
import styles from './WriteBoardPage.module.css'
import EditBoard from '../component/Board/EditBoard';

export default function UpdateBoardPage() {
    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1 className={styles.title}>글 수정</h1>
            </div>
            <EditBoard />
        </div>
    );
}


