import React, { useState } from 'react';
import styles from './WriteComment.module.css'

export default function WriteComment({boardId ,comments, setComments}) {
    const[comment,setComment] =useState("");
    const[valid, setValid] = useState(false);
    //유효성검사
    const handleChange  = (e) => {
        const value = e.target.value;
        setComment(value); 
        (value.trim().length > 0) ? setValid(true) : setValid(false);
        
    }


    const postComment = async(e) => {
        e.preventDefault();

        const commentInfo = {
            writer: localStorage.getItem('id'),
            p_no: boardId,
            content: comment,
        };
        

        try {
            const response = await fetch("http://localhost:3001/comments/insert", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(commentInfo)
            });
            const json = await response.json();
            
            if (json.data === "ok") {
                setComments([...comments, { writer: localStorage.getItem('id'), content: comment }]);
                setComment(''); // 입력 필드 초기화
            } else {
                alert("실패!");
            }
        } catch (error) {
            console.error("댓글 작성 중 오류 발생:", error);
        }
        
        
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
            <div className={styles.buttonDiv}>
                <button className={styles.button}
                    tyep="button"
                    onClick={postComment}
                    disabled={!valid}
                >
                    작성하기
                </button>
            </div>
        </form>
    );
    
}

