import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BoardMain.module.css'

export default function BoardMain() {

    const info = {
        writer: "최유성",
        date: 2023-11-11,
        subject: "심볼레벨업",
        content: "심볼레벨업은 블라블라해서 블라블라해야함",
        hit:23
    }

    const {boardId} = useParams();
    {/* 여기에서 실제 게시글을 렌더링하거나 API 요청 등을 수행할 수 있습니다 */}
    const {writer, date, content, hit, subject} = info;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>작성자:{writer}</div>
                <div>날짜:{date}</div>
                <div>추천:{hit}</div>
            </div>
            <div className={styles.content}>
                <h2 className={styles.subject}> {subject} </h2>
                <div className={styles.content}>{content}</div>
            </div>
        </div>
    );
}

