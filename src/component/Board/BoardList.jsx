import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardList.module.css'

export default function BoardList() {

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
        <div className={styles.boardListContainer}>
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
                <div className={styles.boardCard}>
                    <span className={styles.title}><Link to="/board/interview">면접게시판</Link></span>
                    
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
                <div className={styles.boardCard}>
                    <span className={styles.title}><Link to="/boards/job">취업게시판</Link></span>
                    <div>
                        {content.map((item) => 
                            (<div className={styles.content}>
                                <a id={item.id}href={`/boards/${item.id}`}>
                                    {item.제목} 
                                </a>
                                <div>날짜:{item.date} 추천:{item.추천}</div>
                            </div>)
                        )}
                    </div>
                </div>
        </div>
    );
}

