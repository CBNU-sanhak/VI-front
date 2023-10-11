import React, { useEffect, useState } from 'react';
import Header from '../component/header/Header';
import BoardMain from '../component/Board/BoardMain';
import WriteComment from '../component/Commnent/WriteComment';
import CommentList from '../component/Commnent/CommentList';
import { useParams } from 'react-router-dom';


export default function BoardDetail() {

    const { boardId } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // 게시글 로드
        fetch(`http://localhost:3001/post/${boardId}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('게시글 로드 중 오류 발생:', error);
                setLoading(false);
            });

        // 댓글 로드
        fetch(`http://localhost:3001/comments/post/${boardId}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('댓글 로드 중 오류 발생:', error);
            });
    }, [boardId]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <BoardMain post={post} />
                    <WriteComment boardId={boardId}  comments={comments} setComments={setComments}/>
                    <CommentList boardId={boardId} comments={comments} setComments={setComments} />
                </>
            )}
        </>
    );
}

