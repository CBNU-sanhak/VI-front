import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BoardMain.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
export default function BoardMain({post}) {

    const {boardId} = useParams();
    const [isRecommended, setIsRecommended] = useState(false); // 추천 상태
    const [recommendationCount, setRecommendationCount] = useState(0); // 추천 수
    // const [post, setPost] = useState({});

    // useEffect(() => {
    //     // 서버에서 추천 상태를 가져오는 함수 (예: /api/getRecommendationStatus)
    //     const fetchRecommendationStatus = async () => {
    //     try {
    //         const response = await fetch('/api/getRecommendationStatus'); // 서버 엔드포인트
    //         const data = await response.json();
    //         if (data.isRecommended) {
    //         setIsRecommended(true); // 이미 추천한 경우
    //         }
    //     } catch (error) {
    //         console.error('추천 상태를 가져오는데 문제가 발생했습니다:', error);
    //     }
    //     };

    //     fetchRecommendationStatus();
    // }, []);

    // useEffect(() => {
    //     const getPost = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3001/post/${boardId}`);
    //             const data = await response.json();
    //             setPost(data[0]);
    //         } catch (error) {
    //             console.error('글을 가져오는데 문제가 발생했습니다:', error);
    //         }
    //     };
    //     getPost();
    // }, [boardId]); // boardId가 변경될 때만 실행

    useEffect(() => {
        // setIsRecommended(post.recommend);
        setRecommendationCount(post.recommend);
    }, [post.recommend]); // post.recommend가 변경될 때만 실행


    const handleRecommendationClick = async () => {
        console.log(isRecommended);
        if (!isRecommended) {
            // 서버에 추천 요청을 보내는 함수 (예: /api/recommend)
            fetch(`http://localhost:3001/post/recommend/${boardId}`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.data === "err") {
                        alert("에러 발생 잠시후 이용해 주세요");
                    } else {
                        setIsRecommended(true); // 추천 성공한 경우
                        setRecommendationCount((prevRecommendationCount) => prevRecommendationCount + 1);
                    }
                })
                .catch((error) => console.error(error));
        } else {
            alert("이미 추천한 게시물입니다."); // 이미 추천한 경우 경고 메시지 표시
        }
    };
    
    
    
    


    const {title,writer,content,p_date,nickname} = post;
    

    return (
        <div className={styles.container}>
            <div >
                <h1 className={styles.subject}> {title} </h1>
            </div>
            <div className={styles.header}>
                <div>작성자:{nickname}</div>
                <div>날짜:{p_date}</div>
                <div>추천:{recommendationCount}</div>
            </div>
            <div className={styles.contentbox}>
                <div className={styles.content}>내용:{content}</div>    
                <button onClick={handleRecommendationClick}><FontAwesomeIcon icon={faThumbsUp} /></button>
            </div>
        </div>
    );
}

