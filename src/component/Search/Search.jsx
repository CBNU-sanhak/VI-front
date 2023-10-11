import React, { useContext, useState } from 'react';
import styles from './Search.module.css'
import { useNavigate } from 'react-router-dom';
import { LoginModeContext } from "../../context/LoginModeContext";

export default function Search() {
    const [searchkeyword, setsearchkeyword] = useState("");
    const {isLogin} = useContext(LoginModeContext);
    const navigate = useNavigate();


    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setsearchkeyword(searchValue);
    }

    const onClickWriteButton = () => {
        if(isLogin) {
            navigate('/board/write');
        } else {
            alert('로그인 후에 글을 작성할 수 있습니다.');
            navigate('/login');
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
          // 엔터 키를 누르면 검색 기능을 수행
          performSearch();
        }
      };
    
      const performSearch = () => {
        // 검색 기능 수행 어떻게 하지,,
        navigate(`/search?q=${searchkeyword}`);
      };

      
    return (
        <div className={styles.bottom}>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="검색..."
                        value={searchkeyword}
                        onKeyDown={handleEnterPress}
                        onChange={handleSearch}
                        className={styles.input}
                    />
                    <img alt = "searchIcon" className={styles.searchIcon}src="/img/searchIcon.png"
                         onClick={performSearch} 
                         style={{ cursor: 'pointer' }}>
                    </img>
                </div>
                <button className={styles.button} onClick={onClickWriteButton}> 글작성</button>
            </div> 
    );
}

