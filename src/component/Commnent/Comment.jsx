import React from 'react';
import styles from './Comment.module.css'

export default function Comment( {item , onDelete}) {


    const idString = localStorage.getItem('id');
    const idNumber = parseInt(idString, 10);

    



    const {content , writer, c_date} = item;
    return (
        <div className={styles.commentBox}>
            <div className={styles.commentBox_head}>
                <div>작성자:{ item.nickname}| </div>
                <div className={styles.date}>{c_date}</div>
            </div>
            <div className={styles.comment}>
                <div>    {content}</div>
                {idNumber === item.writer && (
                                <button onClick={() => onDelete(item.id)}>삭제</button>
                            )}
            </div>
        </div>
    );
}

