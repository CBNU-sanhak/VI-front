import React from 'react';
import styles from './Comment.module.css'

export default function Comment( {item}) {
    const {writer, comment, date} = item;
    return (
        <div className={styles.commentBox}>
            <div className={styles.commentBox_head}>
                <div>{ writer}| </div>
                <div className={styles.date}>{ date}</div>
            </div>
            <div className={styles.comment}>{comment}</div>
        </div>
    );
}

