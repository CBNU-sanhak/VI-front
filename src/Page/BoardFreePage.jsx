import React,  { useEffect, useState } from 'react';
import styles from './BoardPage.module.css'
import { Link, Navigate } from 'react-router-dom';

export default function BoardFreePage({boardName}) {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        fetchPosts();
      }, [boardName]);

      //포스트 패치
    const fetchPosts = async () => {
        try {
            const response = await fetch('/dummy/data.json');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('게시글 목록을 가져오는 데 실패했습니다.', error);
        }
    };

    
    // 현재 페이지에 표시할 게시글 범위 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    // 페이지 변경 처리 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const data = [
        {
            제목:"sdf",
            글쓴이:"최유성",
            날짜:"22-08-21",
            id:1,
        },
    ]
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.title}>{boardName} 게시판</h1>
                <div className="post-list">
                    {currentPosts.map((post) => (
                        <Link key={post.id} to={`/board/${post.id}`} className={styles.postlink}>
                        <article>
                            <h2>{post.title}</h2>
                            <span>작성자: {post.author}</span>
                            <span>게시일: {post.date}</span>
                        </article>
                        </Link>
                    ))}
                </div>
                
            {/* 페이지네이션 */}
                <ul className={styles.pagination}>
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                    <li key={index} 
                        className={currentPage === index + 1 ? styles.active : ''}
                        onClick={() => paginate(index + 1)}
                    >
                       <span >{index + 1}</span>
                    </li>
                    ))}
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={styles.search}>
                    <input className={styles.input}></input>
                    <img className={styles.searchIcon}src="/img/searchIcon.png"></img>
                </div>
                <Link to={'/board/write'} ><button className={styles.button}> 글작성</button> </Link>
            </div> 
        </div>
    );
}

