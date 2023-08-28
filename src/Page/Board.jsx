import React from 'react';
import BoardList from '../component/Board/BoardList';
import styles from './Board.module.css'

export default function Board() {
    return (
        <div className={styles.main}>
           <BoardList />
        </div>
    );
}

