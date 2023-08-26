import React from 'react';
import styles from './BoardCard.module.css'
import { Link } from 'react-router-dom';

export default function BoardCard() {

    const content  = [
        {
        제목: "ㅑㅑㅑㅑㅑ",
        id:1,
        date:231212,
        추천:'3'
        },
        {
            제목: "브라블라",
            id:3,
            date:231212,
            추천:'3'
         },
         {
            제목: "더워",
            id:2,
            date:231212,
            추천:'3'
        },      
        {
            제목: "더워",
            id:4,
            date:231212,
            추천:'3'
        },   
        {
            제목: "더워",
            id:5,
            date:231212,
            추천:'3'
        },
        {
            제목: "더워",
            id:5,
            date:231212,
            추천:'3'
        },   
        {
            제목: "더워",
            id:5,
            date:231212,
            추천:'3'
        },       
    ]
    return (
            <div className={styles.boardCard}>
            <span className={styles.title}><Link to="/board/free">자유게시판</Link> </span>
            
            <div>
                {content.map((item) => 
                    (<div className={styles.content}>
                        <a id={item.id}href={`/board/${item.id}`}>
                            {item.제목} 
                        </a>
                        <div>날짜:{item.date} 추천:{item.추천}</div>
                    </div>)
                )}
            </div>
            </div>
        
    );
}

