import React from 'react';
import BoardCard from '../component/Board/BoardCard';
import styles from './BoardPage.module.css'
import { Link, Navigate } from 'react-router-dom';
export default function BoardFreePage({pagename}) {

    const data = [
        {
            제목:"sdf",
            글쓴이:"최유성",
            날짜:"22-08-21",
            id:1,
        },
    ]
    return (
        <div className={styles.page}>
            <BoardCard />
            <div className={styles.bottom}>
                <div className={styles.search}>
                    <input className={styles.input}></input>
                    <img className={styles.searchIcon}src="/img/searchIcon.png"></img>
                </div>
                <Link to={'/board/write'} ><button className={styles.button}> 글작성</button> </Link>
            </div>
            
        </div>
    );
}

