import React from 'react';
import BoardList from '../component/Board/BoardList';
import styles from './Board.module.css'
import Search from '../component/Search/Search';

export default function Board() {
    return (
        <div className={styles.main}>
           <BoardList />
           <Search />
        </div>
    );
}

