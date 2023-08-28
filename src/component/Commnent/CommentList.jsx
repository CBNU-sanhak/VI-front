import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css'

export default function CommentList() {

    {/*데이터 패치 */}
    const data =[
        {
            writer:"최유성",
            comment:"hihihihi",
            date:"23-11-11",
            id:1
        },
        {
            writer:"최유성1",
            comment:"hihihidhi",
            date:"23-11-11",
            id:2
        },
        {
            writer:"최유성2",
            comment:"hihihsdfgihi",
            date:"23-11-11",
            id:3
        },
    ]

    return (
        <div className={styles.commentsBox}>
            <span>{data.length}댓글</span>
            <ul>
                {data.map((item) => <Comment key={item.id} item={item}/>)}
            </ul>
        </div>
    );
}

