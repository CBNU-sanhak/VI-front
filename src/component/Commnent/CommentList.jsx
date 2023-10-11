import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css'

export default function CommentList({ comments ,setComments}) {
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3001/comments/delete/${commentId}`, {
                method: 'delete',
            });
            const json = await response.json();
            if (json.data === 'err') {
                alert('에러 발생 잠시후 이용해 주세요');
            } else if (json.data === 'ok') {
                // 댓글 삭제 성공 시, UI에서 해당 댓글을 제거합니다.
                // 기존의 data 상태를 직접 수정하는 대신, comments 배열에서 해당 댓글을 제거합니다.
                // 그러기 위해 comments 배열을 props로 받아오고, 삭제한 댓글을 제외한 새로운 배열을 만듭니다.
                // 이 새로운 배열을 상태로 설정합니다.
                const updatedComments = comments.filter((comment) => comment.id !== commentId);
                // 새로운 배열로 상태를 업데이트합니다.
                setComments(updatedComments);
            }
        } catch (error) {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className={styles.commentsBox}>
            <span>{comments.length}댓글</span>
            <ul>
                {comments.map((item) => (
                    <Comment key={item.id} item={item} onDelete={() => handleDeleteComment(item.id)} />
                ))}
            </ul>
        </div>
    );
}

