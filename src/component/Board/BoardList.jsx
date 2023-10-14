import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardList.module.css'
//커뮤니티페이지의 게시판들의 미리보기를 위한 컴포넌트
// 추천 api, 미리보기를 위한 api가 필요 8개 최신순 
//

//url /a, b, c,안됨 
const url = "http://localhost:3001/post/" 


export default function BoardList() {

    const [freeData ,setFreeData] = useState([]);
    const [jobData ,setJobData] = useState([]);
    const [interviewData ,setInterviewData] = useState([]);

    useEffect(() => {

        
            fetchData('a');
            fetchData('b');
            fetchData('c');
    }, [])

    const fetchData = async (category) => {
        await fetch(url+category)
            .then((response) => response.json())
            .then((data) => {
                if(category === 'a'){
                    setFreeData(data);
                }else if (category === 'b'){
                    setInterviewData(data);
                }else {
                    setJobData(data);
                }
            })
            .catch((error) => console.log(error))
            };


    return (
        <div className={styles.boardListContainer}>
                <div className={styles.comunity}>
                    <h2 className={styles.pageName}>커뮤니티</h2>
                </div>
                <div className={styles.boardCard}>
                    <Link to="/board/free"><div className={styles.title}>자유게시판 </div></Link>
                   
                    <div className={styles.forScroll}>
                        {freeData.map((item) => 
                            (<Link to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <Link to="/board/interview"><div className={styles.title}>면접게시판</div></Link>
                    
                    <div className={styles.forScroll}>
                        {interviewData.map((item) => 
                            (<Link to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
                <div className={styles.boardCard}>
                    <Link to="/board/job"><div className={styles.title}>취업게시판</div></Link>
                    <div className={styles.forScroll}>
                        {jobData.map((item) => 
                            (<Link to={`/board/${item.id}`}>
                                <div  key={item.id} className={styles.content}>
                                    <span>
                                        {item.title} 
                                    </span>
                                    <div>날짜:{item.p_date} 추천:{item.recommend}</div>
                                </div>
                            </Link>)
                        )}
                    </div>
                </div>
        </div>
    );
}

