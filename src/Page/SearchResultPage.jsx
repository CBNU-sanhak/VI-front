import React, { useEffect, useState } from 'react';
import styles from './BoardPage.module.css'
import { Link, useLocation } from 'react-router-dom';
import Search from '../component/Search/Search';


export default function SearchResultPage() {

    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q'); // 이렇게 쿼리 문자열에서 'q' 파라미터를 얻을 수 있음
 
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

  useEffect(() => {
    // 검색 결과를 가져오는 비동기 함수를 호출
    fetchSearchResults(); // 이 함수를 구현해야 함
  }, []);

  const fetchSearchResults = async() => {
    // 여기에서 검색 결과를 가져오는 비동기 요청을 수행
    // 결과를 setSearchResults로 설정
      await fetch('http://localhost:3001/post/search',
          {
            method: 'POST', // POST 메서드를 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: query }), // 검색어를 서버로 보내기
        })
        .then((response) => response.json())
        .then((data) =>  setSearchResults(data))
        .catch((error) => console.log(error))
    };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}> 검색결과</h1>
            <div className="post-list">
                {currentResults.map((searchResult) => (
                    <Link key={searchResult.id} to={`/board/${searchResult.id}`} className={styles.postlink}>
                      <div className={styles.postContent}>
                          <div>
                              <h2>{searchResult.title}</h2>
                              <span>작성자: {searchResult.nickname}</span>
                          </div>
                          <div className={styles.postinfo}>
                              <span>게시일: {searchResult.p_date} 추천: {searchResult.recommend}</span>
                          </div>
                      </div>
                    </Link>
                ))}
            </div>
            
        {/* 페이지네이션 */}
            <ul className={styles.pagination}>
                {Array.from({ length: Math.ceil(searchResults.length / resultsPerPage) }, (_, index) => (
                <li key={index} 
                    className={currentPage === index + 1 ? styles.active : ''}
                    onClick={() => paginate(index + 1)}
                >
                   <span >{index + 1}</span>
                </li>
                ))}
            </ul>
        <Search></Search>
        </div>
    </div>
);
}