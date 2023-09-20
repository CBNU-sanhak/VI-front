import React from 'react';
import styles from './BoardCard.module.css'
import { Link } from 'react-router-dom';

export default function BoardCard() {

    const content  = [     
        {
            id:'2',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            추천:'3',
            p_date:'20231212'
        },
        {
            id:'3',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            추천:'3',
            p_date:'20231212'
        }, 
        {
            id:'4',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            추천:'3',
            p_date:'20231212'
        }, 
        {
            id:'5',
            title:'오늘 매우 더움',
            writer:'cys9813',
            content:"blblblblblblbl",
            category:'1',
            추천:'3',
            p_date:'20231212'
        },     
    ]
    return (
            <div className={styles.boardCard}>
            <span className={styles.title}><Link to="/board/free">자유게시판</Link> </span>
            
            <div>
                {content.map((item) => 
                    (<div className={styles.content}>
                        <span>{item.writer}</span>
                        <a id={item.id}href={`/board/${item.id}`}>
                            {item.title} 
                        </a>
                        <div>날짜:{item.date} 추천:{item.추천}</div>
                    </div>)
                )}
            </div>
            </div>
        
    );
}

