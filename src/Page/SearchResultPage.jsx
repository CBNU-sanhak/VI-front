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

  const fetchSearchResults = () => {
    // 여기에서 검색 결과를 가져오는 비동기 요청을 수행
    // 결과를 setSearchResults로 설정
    
    const data = [
      // 검색 결과 데이터 예시
      { id: 1, title: '검색 결과 1', description: '검색 결과 설명 1' },
      { id: 2, title: '검색 결과 2', description: '검색 결과 설명 2' },
      // 검색 결과 데이터 추가
    ];

    setSearchResults(data); // 위에서 가져온 실제 검색 결과 데이터로 설정
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.page}>
        <div className={styles.content}>
            <h1 className={styles.title}> 검색결과</h1>
            <div className="post-list">
                {currentResults.map((searchResult) => (
                    <Link key={searchResult.id} to={`/board/${searchResult.id}`} className={styles.postlink}>
                    <article>
                        <h2>{searchResult.title}</h2>
                        <span>작성자: {searchResult.writer}</span>
                        <span>게시일: {searchResult.p_date}</span>
                    </article>
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
        </div>
        <Search></Search>
    </div>
);
}