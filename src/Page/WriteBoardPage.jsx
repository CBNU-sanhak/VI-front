import React from 'react';
import WriteBoard from '../component/Board/WriteBoard';
import styles from './WriteBoardPage.module.css'

export default function WriteBoardPage() {
    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1 className={styles.title}>글 쓰기</h1>
            </div>
            <WriteBoard />
        </div>
    );
}


