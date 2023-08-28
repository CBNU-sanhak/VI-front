import React, { useState } from 'react';
import styles from './WriteComment.module.css'

export default function WriteComment() {
    const[comment,setComment] =useState("");
    const[valid, setValid] = useState(false);
    const handleChange  = (e) => {
        const value = e.target.value;
        setComment(value); 
        (value.trim().length > 0) ? setValid(true) : setValid(false);

        
        
    }

    const postComment = (e) => {
        {/*서버에 포스트하기*/}
        setComment("");
        setValid(false);
    }
    return (
        <form className={styles.form}>
            <textarea className={styles.input}
                type="text"
                placeholder="댓글 달기..."
                onChange={handleChange}
                value={comment}
            />
            <button className={styles.button}
                tyep="button"
                onClick={postComment}
                disabled={!valid}
            >
                작성
            </button>
        </form>
    );
    
}

