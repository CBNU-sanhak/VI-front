import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminBoard.module.css'

export default function AdminBoard() {

        const url = "http://localhost:3001/post/" 

        const [freeData ,setFreeData] = useState([]);
        const [jobData ,setJobData] = useState([]);
        const [interviewData ,setInterviewData] = useState([]);

        useEffect(() => {
                fetchData('a');
                fetchData('b');
                fetchData('c');
        }, [])

         //게시글 삭제
    const onClickDeletePost = async(id) => {
        try {
            const response = await fetch(`http://localhost:3001/post/delete/${id}`, {
                method: 'delete',
            });
            const json = await response.json();
            if (json.data === 'err') {
                alert('에러 발생 잠시후 이용해 주세요');
            } else if (json.data === 'ok') {
                alert('삭제 되었습니다.');
            }
        } catch (error) {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
        }
    }

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
                        <h2 className={styles.pageName}>커뮤니티 관리</h2>
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
                                        <div>날짜:{item.p_date} 추천:{item.recommend}   
                                        <button className={styles.deleteButton} onClick={()=>onClickDeletePost(item.id)}> 삭제하기 </button>
                                        </div>
                                        
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
                                        <div>날짜:{item.p_date} 추천:{item.recommend}   
                                        <button className={styles.deleteButton} onClick={()=>onClickDeletePost(item.id)}> 삭제하기 </button>
                                        </div>
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
                                        <div>날짜:{item.p_date} 추천:{item.recommend}   
                                        <button className={styles.deleteButton} onClick={()=>onClickDeletePost(item.id)}> 삭제하기 </button>
                                        </div>
                                    </div>
                                </Link>)
                            )}
                        </div>
                    </div>
            </div>
        );
}

