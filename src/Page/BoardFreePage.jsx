import React,  { useContext, useEffect, useState } from 'react';
import styles from './BoardPage.module.css'
import { Link} from 'react-router-dom';
import Search from '../component/Search/Search';

export default function BoardFreePage({boardName}) {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const url = "http://localhost:3001/post/" 
    let category;

    if(boardName==="free")
        category = 'a';
    else if(boardName==='interview')
        category = 'b';
    else
        category = 'c';

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchData = async (url) => {
                await fetch(url)
                    .then((response) => response.json())
                    .then((data) => setPosts(data))
                    .catch((error) => console.log(error))
                    };
                fetchData(url+category);
        };

        fetchPosts();
      }, [boardName]);

      //포스트 패치
    

    
    // 현재 페이지에 표시할 게시글 범위 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    // 페이지 변경 처리 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

   
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{boardName} 게시판</h1>
                <div className="post-list">
                    {currentPosts.map((post) => (
                        <Link key={post.id} to={`/board/${post.id}`} className={styles.postlink}>
                        <article>
                            <h2>{post.title}</h2>
                            <span>작성자: {post.writer}</span>
                            <span>게시일: {post.p_date}</span>
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
            <Search></Search>
        </div>
    );
}

